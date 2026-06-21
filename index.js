// Static portfolio page. Add interactions here if needed.
const navLinks = document.querySelectorAll(".folder-nav a");

const sections = [...navLinks]
  .map((link) => {
    const id = link.getAttribute("href");
    return document.querySelector(id);
  })
  .filter(Boolean);

const activateNav = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activateNav(entry.target.id);
      }
    });
  },
  {
    root: null,
    rootMargin: "-30% 0px -55% 0px",
    threshold: 0,
  },
);

sections.forEach((section) => observer.observe(section));
