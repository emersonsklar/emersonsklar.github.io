/* ==========================================================================
   Video carousel controls (content.html "Watch" section).

   Drives the prev/next arrows: each click scrolls the track by one "page"
   (the visible width). Also enables/disables the arrows at the two ends.
   Everything is vanilla JS — no libraries. The layout itself is pure CSS
   (see assets/css/carousel.css); this file handles the arrow buttons and
   places cards so each page reads left-to-right, row by row, in source order.
   ========================================================================== */
(function () {
  "use strict";

  // Set up every .carousel on the page (there is one, but this is generic).
  function initCarousel(carousel) {
    var track = carousel.querySelector(".carousel-track");
    var prevBtn = carousel.querySelector(".carousel-btn.prev");
    var nextBtn = carousel.querySelector(".carousel-btn.next");
    if (!track || !prevBtn || !nextBtn) return;

    // Honor the user's motion preference — no smooth animation if reduced.
    var reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    var scrollBehavior = reduceMotion ? "auto" : "smooth";

    // One "page" = the current visible width of the track.
    function pageWidth() {
      return track.clientWidth;
    }

    function scrollByPage(direction) {
      track.scrollBy({
        left: direction * pageWidth(),
        behavior: scrollBehavior
      });
    }

    // Dim/disable arrows at the start and end of the scrollable range.
    function updateButtons() {
      // 2px tolerance to absorb sub-pixel rounding in scroll math.
      var maxScroll = track.scrollWidth - track.clientWidth;
      prevBtn.disabled = track.scrollLeft <= 2;
      nextBtn.disabled = track.scrollLeft >= maxScroll - 2;
    }

    prevBtn.addEventListener("click", function () {
      scrollByPage(-1);
    });
    nextBtn.addEventListener("click", function () {
      scrollByPage(1);
    });

    // CSS grid alone fills column by column (down-then-right), which scrambles
    // the reading order within a page. Place each card explicitly so a page of
    // 2 rows x N columns fills the top row first, then the bottom row — cards
    // read in the same order they appear in the HTML (newest first).
    var items = track.querySelectorAll(".media-item");
    function layoutItems() {
      if (!items.length) return;
      for (var j = 0; j < items.length; j++) {
        items[j].style.gridRow = "";
        items[j].style.gridColumn = "";
      }
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      var cols = Math.max(1, Math.round(
        (track.clientWidth + gap) / (items[0].offsetWidth + gap)
      ));
      var perPage = cols * 2;
      for (var i = 0; i < items.length; i++) {
        var page = Math.floor(i / perPage);
        var slot = i % perPage;
        items[i].style.gridRow = String(Math.floor(slot / cols) + 1);
        items[i].style.gridColumn = String(page * cols + (slot % cols) + 1);
      }
    }

    // Keep the layout and arrow states in sync with scroll position and resizes.
    track.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", function () {
      layoutItems();
      updateButtons();
    });

    layoutItems();
    updateButtons();
  }

  function init() {
    var carousels = document.querySelectorAll(".carousel");
    for (var i = 0; i < carousels.length; i++) {
      initCarousel(carousels[i]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
