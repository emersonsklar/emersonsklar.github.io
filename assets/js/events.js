/* =========================================================================
   EVENTS DATA — the ONE place you edit your events.
   -------------------------------------------------------------------------
   Add, edit, or remove entries below. Everything else is automatic:
   the site sorts each event into "Upcoming" or "Past" by comparing its
   date to today, so you never have to move anything by hand.

   Each event:
     date     "YYYY-MM-DD"   (required) — the day of the event (start day).
     endDate  "YYYY-MM-DD"   (optional) — for multi-day events; an event
                              counts as "past" only after its end date.
     title    string         (required) — the event / talk name.
     event    string         — series or host (optional).
     location string         — city / venue.
     role     string         — e.g. "Keynote", "Panel", "Booth", "MC".
     url      string         — link to the event page (optional).
     blurb    string         — one-line description (optional).

   ⚠️ Entries marked "DATE UNCONFIRMED" below have placeholder dates so they
      sort correctly — please replace with the real dates when you have them.
   ========================================================================= */

window.SKLAR_EVENTS = [

  /* ---------------------- UPCOMING ---------------------- */

  {
    date: "2026-07-22",
    title: "Alexa+ Partner Summit",
    event: "Amazon Alexa",
    location: "Seattle, WA",
    role: "Master of Ceremonies",
    url: "",
    blurb: "Hosting Amazon's flagship gathering of Alexa+ partners as we open the next chapter of ambient AI."
  },
  {
    date: "2026-07-30",
    endDate: "2026-07-31",
    title: "Chain React 2026",
    event: "Infinite Red",
    location: "Portland, OR",
    role: "Speaker",
    url: "https://chainreactconf.com/",
    blurb: "The U.S. React Native conference."
  },
  {
    date: "2026-10-21",
    endDate: "2026-10-23",
    title: "CityJS Athens 2026",
    event: "CityJS",
    location: "Athens, Greece",
    role: "Speaker",
    url: "https://athens.cityjsconf.org/",
    blurb: "The JavaScript community conference, Athens edition."
  },
  {
    date: "2026-11-30",
    endDate: "2026-12-04",
    title: "AWS re:Invent 2026",
    event: "Amazon Web Services",
    location: "Las Vegas, NV",
    role: "Speaker",
    url: "https://aws.amazon.com/events/reinvent",
    blurb: "AWS's flagship annual cloud conference."
  },
  {
    date: "2026-09-17",
    endDate: "2026-09-18",
    title: "AgentConf Warsaw",
    event: "AgentConf",
    location: "Warsaw, Poland",
    role: "Speaker",
    url: "https://agent.sh",
    blurb: "The conference for developers building AI agents."
  },
  {
    date: "2026-09-20",
    endDate: "2026-09-22",
    title: "Zenoti Innergize",
    event: "Zenoti",
    location: "Seattle, WA",
    role: "Speaker",
    url: "https://www.zenoti.com/innergize",
    blurb: "Zenoti's annual conference for the beauty and wellness industry."
  },
  {
    date: "2026-10-07",
    endDate: "2026-10-09",
    title: "Nextapp DevCon",
    event: "Nextapp",
    location: "Berlin, Germany",
    role: "Speaker",
    url: "https://www.nextappcon.com/",
    blurb: "App development conference in Berlin."
  },

  /* ---------------------- PAST (H1 2026) ----------------------
     Exact dates below are approximate for some events — they only affect the
     month label and ordering. Correct any you'd like to be precise. */

  {
    date: "2026-01-06",
    endDate: "2026-01-09",
    title: "CES 2026",
    event: "Consumer Technology Association",
    location: "Las Vegas, NV",
    role: "Keynote & Booth",
    url: "https://www.ces.tech/",
    blurb: "Debuted the Alexa+ AI Innovator Series and represented Alexa+ on the floor."
  },
  {
    date: "2026-03-02",
    endDate: "2026-03-05",
    title: "MWC Barcelona 2026",
    event: "GSMA",
    location: "Barcelona, Spain",
    role: "Speaker & Booth",
    url: "https://www.mwcbarcelona.com/",
    blurb: "Carried the Alexa+ story to the world's largest mobile industry gathering."
  },
  {
    date: "2026-04-01",
    title: "AWS Summit Paris",
    event: "Amazon Web Services",
    location: "Paris, France",
    role: "Speaker",
    url: "https://aws.amazon.com/events/summits/",
    blurb: "Alexa+ on stage for the French developer and partner community."
  },
  {
    date: "2026-04-05",
    endDate: "2026-04-08",
    title: "Seatrade Cruise Global",
    event: "Seatrade",
    location: "Miami, FL",
    role: "Speaker",
    url: "https://www.seatradecruiseglobal.com/",
    blurb: "Alexa's first-ever appearance at the premier cruise-industry show."
  },
  {
    date: "2026-04-22",
    title: "AWS Summit London",
    event: "Amazon Web Services",
    location: "London, UK",
    role: "Speaker",
    url: "https://aws.amazon.com/events/summits/",
    blurb: "Represented Alexa+ across the UK developer and partner community."
  },
  {
    date: "2026-04-27",
    endDate: "2026-04-28",
    title: "Project Voice 2026",
    event: "Project Voice",
    location: "USA",
    role: "Speaker",
    url: "https://www.projectvoice.ai/",
    blurb: "The longest-running of the original voice-technology conferences."
  },
  {
    date: "2026-05-13",
    endDate: "2026-05-14",
    title: "AWS Summit Sydney",
    event: "Amazon Web Services",
    location: "Sydney, Australia",
    role: "Speaker",
    url: "https://aws.amazon.com/events/summits/",
    blurb: "Represented Alexa+ across the APAC developer and partner community."
  },
  {
    date: "2026-06-15",
    endDate: "2026-06-20",
    title: "VivaTech 2026",
    event: "Viva Technology",
    location: "Paris, France",
    role: "Exhibit Lead",
    url: "https://vivatech.com/",
    blurb: "Led the first public debut of French Alexa+ to the developer and partner community."
  }
];
