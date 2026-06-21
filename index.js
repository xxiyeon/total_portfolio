const navLinks = [...document.querySelectorAll(".folder-nav a")];
const portfolioPage = document.querySelector(".portfolio-page");

const SCROLL_EXTRA = {
  about: 0,
  "tech-stack": 560,
  projects: 300,
};

const getSectionId = (link) => link.getAttribute("href").replace("#", "");

const getAbsoluteTop = (element) => {
  return element.getBoundingClientRect().top + window.scrollY;
};

const getScrollTop = (id) => {
  if (id === "about") {
    return Math.max(0, getAbsoluteTop(portfolioPage) - 1);
  }

  const section = document.getElementById(id);

  if (!section) {
    return 0;
  }

  const basePosition = getAbsoluteTop(section) - window.innerHeight * 0.33;

  return Math.max(0, basePosition + (SCROLL_EXTRA[id] || 0));
};

const easeInOutCubic = (progress) => {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
};

const smoothScrollTo = (targetY, duration = 950) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  const animateScroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

const activateNav = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", getSectionId(link) === id);
  });
};

const updateActiveNav = () => {
  const currentY = window.scrollY + 8;
  const techTop = getScrollTop("tech-stack");
  const projectsTop = getScrollTop("projects");

  if (currentY >= projectsTop) {
    activateNav("projects");
    return;
  }

  if (currentY >= techTop) {
    activateNav("tech-stack");
    return;
  }

  activateNav("about");
};

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const id = getSectionId(link);
    const targetY = getScrollTop(id);

    smoothScrollTo(targetY, 950);
    activateNav(id);
  });
});

const revealTargets = [
  ".intro-section",
  ".training-approach-grid",
  ".tech-section",
  ".project-panel",
  ".footer",
];

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    root: null,
    threshold: 0.18,
    rootMargin: "0px 0px -12% 0px",
  },
);

document.querySelectorAll(revealTargets.join(",")).forEach((target) => {
  target.classList.add("scroll-reveal");
  revealObserver.observe(target);
});

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("resize", updateActiveNav);

updateActiveNav();
