/* ==========================================================================
   Video carousel controls (content.html "Watch" section).

   Drives the prev/next arrows: each click scrolls the track by one "page"
   (the visible width). Also enables/disables the arrows at the two ends.
   Everything is vanilla JS — no libraries. The layout itself is pure CSS
   (see assets/css/carousel.css); this file only handles the arrow buttons.
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

    // Keep the arrow states in sync with scroll position and layout changes.
    track.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);

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
