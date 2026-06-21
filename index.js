const navLinks = [...document.querySelectorAll(".folder-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const activateNav = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
};

const updateActiveNav = () => {
  const checkLine = window.scrollY + window.innerHeight * 0.33;
  let currentSection = sections[0];

  sections.forEach((section) => {
    if (section.offsetTop <= checkLine) {
      currentSection = section;
    }
  });

  if (currentSection) {
    activateNav(currentSection.id);
  }
};

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("resize", updateActiveNav);
updateActiveNav();
