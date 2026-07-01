/* =========================================================================
   RENDER EVENTS — automatic. You should not need to edit this file.
   -------------------------------------------------------------------------
   Reads window.SKLAR_EVENTS (from events.js), splits them into upcoming vs.
   past by comparing each event's date to TODAY, sorts them, and injects the
   markup into whatever containers exist on the current page:

     #events-upcoming   full upcoming list   (Events page)
     #events-past       full past list       (Events page)
     #events-home       next few upcoming    (Home page teaser)

   An event is "past" the day AFTER it ends (uses endDate if present,
   otherwise date), so the day-of an event still shows as upcoming.
   ========================================================================= */
(function () {
  "use strict";

  var events = window.SKLAR_EVENTS || [];

  // Today's date at local midnight, so time-of-day never matters.
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  function parseDate(s) {
    // Parse "YYYY-MM-DD" as a local date (avoids UTC off-by-one).
    var p = String(s).split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function fmt(d) { return MONTHS[d.getMonth()] + " " + d.getFullYear(); }
  function fmtLong(d) { return MONTHS[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear(); }

  // Full day-level date, collapsing a multi-day range into the tersest correct form:
  //   same month:  "Sep 20–22, 2026"
  //   diff month:  "Oct 30 – Nov 1, 2026"
  //   diff year:   "Dec 30, 2026 – Jan 2, 2027"
  // Single-day events fall back to "Sep 20, 2026".
  function fmtRange(start, end) {
    if (!end || +end === +start) return fmtLong(start);
    var sM = start.getMonth(), sY = start.getFullYear();
    var eM = end.getMonth(), eY = end.getFullYear();
    if (sY !== eY) {
      return fmtLong(start) + " – " + fmtLong(end);
    }
    if (sM !== eM) {
      return MONTHS[sM] + " " + start.getDate() + " – " +
             MONTHS[eM] + " " + end.getDate() + ", " + sY;
    }
    return MONTHS[sM] + " " + start.getDate() + "–" + end.getDate() + ", " + sY;
  }

  // Decorate each event with parsed dates + upcoming/past flag.
  events.forEach(function (e) {
    e._start = parseDate(e.date);
    e._end = e.endDate ? parseDate(e.endDate) : e._start;
    e._isPast = e._end < today;   // strictly before today = past
  });

  var upcoming = events.filter(function (e) { return !e._isPast; })
                       .sort(function (a, b) { return a._start - b._start; }); // soonest first
  var past = events.filter(function (e) { return e._isPast; })
                   .sort(function (a, b) { return b._start - a._start; });     // most recent first

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Build a <li> timeline row for the Events page.
  function timelineItem(e, upcomingFlag) {
    // Upcoming: full day-level range. Past: full range too if multi-day,
    // otherwise just the month + year for a tidy history.
    var when = upcomingFlag
      ? fmtRange(e._start, e._end)
      : (e.endDate ? fmtRange(e._start, e._end) : fmt(e._start));
    var titleHtml = e.url
      ? '<a href="' + esc(e.url) + '" target="_blank" rel="noopener">' + esc(e.title) + '</a>'
      : esc(e.title);
    var venueBits = [];
    if (e.role) venueBits.push(esc(e.role));
    if (e.event) venueBits.push(esc(e.event));
    if (e.location) venueBits.push(esc(e.location));
    return '' +
      '<li>' +
        '<div class="when">' + esc(when) + '</div>' +
        '<div class="what">' +
          '<h3>' + titleHtml + '</h3>' +
          '<div class="venue">' + venueBits.join(" &middot; ") + '</div>' +
          (e.blurb ? '<p>' + esc(e.blurb) + '</p>' : '') +
        '</div>' +
      '</li>';
  }

  // Build a compact card for the Home page teaser.
  function homeCard(e) {
    var inner = '' +
      '<span class="meta">' + esc(fmtRange(e._start, e._end)) + (e.location ? ' &middot; ' + esc(e.location) : '') + '</span>' +
      '<h3>' + esc(e.title) + '</h3>' +
      '<p>' + [e.role, e.event].filter(Boolean).map(esc).join(" &middot; ") + '</p>' +
      (e.url ? '<div class="arrow">Details &rarr;</div>' : '');
    return e.url
      ? '<a class="card" href="' + esc(e.url) + '" target="_blank" rel="noopener">' + inner + '</a>'
      : '<div class="card">' + inner + '</div>';
  }

  function fill(id, html, emptyMsg) {
    var el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = html || ('<p style="color:var(--muted);">' + emptyMsg + '</p>');
  }

  // --- Events page ---
  fill("events-upcoming",
       upcoming.map(function (e) { return timelineItem(e, true); }).join(""),
       "No upcoming events announced right now — check back soon.");
  fill("events-past",
       past.map(function (e) { return timelineItem(e, false); }).join(""),
       "Past events will appear here.");

  // --- Home page teaser (next 3 upcoming) ---
  var homeEl = document.getElementById("events-home");
  if (homeEl) {
    var next = upcoming.slice(0, 3);
    if (next.length) {
      homeEl.innerHTML = next.map(homeCard).join("");
    } else {
      homeEl.innerHTML = '<div class="card"><h3>More soon</h3>' +
        '<p>No public events on the calendar at the moment. ' +
        '<a href="/contact.html" class="accent">Invite me &rarr;</a></p></div>';
    }
  }
})();
