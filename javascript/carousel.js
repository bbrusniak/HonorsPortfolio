"use strict";
(function() {

	window.addEventListener("load", init);

  const QUARTER_IMG_TIMERS = new Map(); // Maps from a quarter to its setInterval timerId
  const QUARTER_IMG_NUM = new Map(); // Maps from a quarter to its current image index
  const QUARTER_IMGS = new Map();

	function init() {
    setUpImageMap();
    addCarousels();
    addClick();
	}

  function setUpImageMap() {
    const AU_19_IMAGE_NAMES = ["Colliseum.jpg", "full_group_last_day.jpg", "colliseum_group.jpg", "fountain.jpg"];
    QUARTER_IMGS.set("19AU", AU_19_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("19AU", 0);
    QUARTER_IMG_TIMERS.set("19AU", null);

    const WI_20_IMAGE_NAMES = ["EmptyDorm.jpg", "NewYork.jpg", "Toms.jpg", "311_Proof.jpg"];
    QUARTER_IMGS.set("20WI", WI_20_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("20WI", 0);
    QUARTER_IMG_TIMERS.set("20WI", null);

    const SP_20_IMAGE_NAMES = ["home.jpg", "332_Screenshot.jpg", "TA_Application.jpg"];
    QUARTER_IMGS.set("20SP", SP_20_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("20SP", 0);
    QUARTER_IMG_TIMERS.set("20SP", null);

    const SU_20_IMAGE_NAMES = ["camping.jpg", "poker_now.jpg", "ghost_pacer_setup.jpg", "kickstarter.jpg"];
    QUARTER_IMGS.set("20SU", SU_20_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("20SU", 0);
    QUARTER_IMG_TIMERS.set("20SU", null);
  }

  function addClick() {
    let quarters = document.querySelectorAll("#map .quarter");
    quarters.forEach(e => {
      let quarterSummary = e.querySelector(".quarter-summary");
      let closeButton = e.querySelector(".quarter-summary button");
      let quarterImage = e.querySelector("img");
      let quarterName = e.querySelector("img + div");
      e.addEventListener("click", () => {
        if(quarterSummary.classList.contains("close-button-clicked")) {
          quarterSummary.classList.remove("close-button-clicked");
        } else {
          if (quarterSummary) {
            quarterSummary.classList.remove("hide");
            quarterSummary.classList.add("show-list");
          }
          quarterImage.classList.add("hide");
          quarterName.classList.add("hide");
        }
      });
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          quarterSummary.classList.remove("show-list");
          quarterSummary.classList.add("hide");
          quarterSummary.classList.add("close-button-clicked");
          quarterImage.classList.remove("hide");
          quarterName.classList.remove("hide");
          e.removeEventListener("click");
        });
      }
    });
  }

  function addCarousels() {
    let quarters = document.querySelectorAll("#map .quarter");
    quarters.forEach(e => {
      let quarterImage = e.querySelector("img");
      let quarter = e.querySelector("div").textContent;
      e.addEventListener("mouseenter", () => {startCarousel(quarterImage, quarter)});
      e.addEventListener("mouseleave", () => {pauseCarousel(quarter)});
    });
  }

  function startCarousel(quarterImage, quarter) {
    if(!QUARTER_IMG_TIMERS.get(quarter)) {
      getNextImage(quarterImage, quarter);
      let timerId = setInterval(getNextImage, 1000, quarterImage, quarter);
      QUARTER_IMG_TIMERS.set(quarter, timerId);
    }
  }

  function getNextImage(quarterImage, quarter) {
    let currCount = QUARTER_IMG_NUM.get(quarter) + 1;
    let images = QUARTER_IMGS.get(quarter);
    currCount = (currCount % images.length);
    QUARTER_IMG_NUM.set(quarter, currCount);
    quarterImage.src = "images/" + quarter + "/" + images[currCount];
  }

  function pauseCarousel(quarter) {
    if (QUARTER_IMG_TIMERS.get(quarter)) {
      clearInterval(QUARTER_IMG_TIMERS.get(quarter));
      QUARTER_IMG_TIMERS.set(quarter, null);
    }
  }

	// other functions you may define
})();
