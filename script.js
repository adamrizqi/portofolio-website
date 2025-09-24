document.addEventListener("DOMContentLoaded", () => {
  /**
   * Menginisialisasi fungsionalitas slider/carousel untuk bagian "Technical Skills".
   */
  function initializeSkillSlider() {
    const skillsSection = document.querySelector(".skills");
    const wrapper = skillsSection.querySelector(".skills-wrapper");
    const track = skillsSection.querySelector(".skills-track");
    const leftBtn = skillsSection.querySelector(".arrow.left");
    const rightBtn = skillsSection.querySelector(".arrow.right");

    const skillItems = Array.from(track.children);
    skillItems.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });

    const SCROLL_SPEED = 0.8;
    const GAP_WIDTH = 40;
    const scrollAmountPerClick = skillItems[0].offsetWidth + GAP_WIDTH;
    const trackWidth = track.scrollWidth / 2;

    let scrollAnimation;
    let isPausedByHover = false;

    const autoScroll = () => {
      if (!isPausedByHover) {
        wrapper.scrollLeft += SCROLL_SPEED;
        if (wrapper.scrollLeft >= trackWidth) {
          wrapper.scrollLeft = 0;
        }
      }
      scrollAnimation = requestAnimationFrame(autoScroll);
    };

    skillsSection.addEventListener(
      "mouseenter",
      () => (isPausedByHover = true)
    );
    skillsSection.addEventListener(
      "mouseleave",
      () => (isPausedByHover = false)
    );

    rightBtn.addEventListener("click", () => {
      wrapper.scrollBy({ left: scrollAmountPerClick, behavior: "smooth" });
    });

    leftBtn.addEventListener("click", () => {
      if (wrapper.scrollLeft < scrollAmountPerClick) {
        wrapper.scrollLeft += trackWidth;
      }
      wrapper.scrollBy({ left: -scrollAmountPerClick, behavior: "smooth" });
    });

    requestAnimationFrame(autoScroll);
  }

  /**
   * Menginisialisasi efek hover pada logo sosial media.
   */
  function initializeLogoHover() {
    const allLogos = document.querySelectorAll(".logo-hover");

    allLogos.forEach((logo) => {
      const { diam: staticSrc, gerak: animatedSrc } = logo.dataset;

      if (!staticSrc || !animatedSrc) {
        return;
      }

      logo.addEventListener("mouseover", () => {
        logo.src = animatedSrc;
      });

      logo.addEventListener("mouseout", () => {
        logo.src = staticSrc;
      });
    });
  }

  initializeSkillSlider();
  initializeLogoHover();
});
