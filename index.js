const navLinks = [...document.querySelectorAll(".folder-nav a")];
const portfolioPage = document.querySelector(".portfolio-page");

// 현재 코드 기준에서 책갈피 클릭 위치만 조금씩 더 내려주는 값입니다.
// 숫자를 키우면 더 아래로 내려가고, 줄이면 더 위에서 멈춥니다.
const SCROLL_EXTRA = {
  about: 0,
  "tech-stack": 150,
  projects: 300,
};

const getSectionId = (link) => link.getAttribute("href").replace("#", "");

const getScrollTop = (id) => {
  if (id === "about") {
    return portfolioPage.offsetTop;
  }

  const section = document.getElementById(id);

  if (!section) {
    return 0;
  }

  const currentBasePosition = section.offsetTop - window.innerHeight * 0.33;

  return Math.max(0, currentBasePosition + (SCROLL_EXTRA[id] || 0));
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

    window.scrollTo({
      top: getScrollTop(id),
      behavior: "smooth",
    });

    activateNav(id);
  });
});

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("resize", updateActiveNav);
updateActiveNav();
