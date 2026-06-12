document.addEventListener("DOMContentLoaded", () => {
    // ==================== Mobile Nav ====================
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-item");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("show");
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("show");
            });
        });
    }

    // ==================== Navbar Scroll / Active Menu ====================
    const navbar = document.getElementById("navbar");
    const sections = document.querySelectorAll("section, footer");

    const updateNavbarState = () => {
        const scrollY = window.pageYOffset;

        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }

        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;

            if (scrollY >= sectionTop - 120) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");

            const href = link.getAttribute("href");
            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", updateNavbarState);
    updateNavbarState();

    // ==================== Email Copy ====================
    const copyEmailBtn = document.getElementById("copyEmailBtn");
    const emailText = document.getElementById("emailText");

    const copyTextFallback = (text) => {
        const textarea = document.createElement("textarea");

        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.top = "-9999px";
        textarea.style.left = "-9999px";

        document.body.appendChild(textarea);
        textarea.select();

        const copied = document.execCommand("copy");
        document.body.removeChild(textarea);

        return copied;
    };

    if (copyEmailBtn && emailText) {
        const originalText = emailText.textContent;
        const email = copyEmailBtn.dataset.email || originalText;

        copyEmailBtn.addEventListener("click", async () => {
            let copied = false;

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(email);
                    copied = true;
                } else {
                    copied = copyTextFallback(email);
                }
            } catch (error) {
                copied = copyTextFallback(email);
            }

            if (!copied) {
                emailText.textContent = "복사 실패";
                copyEmailBtn.setAttribute("aria-label", "이메일 주소 복사 실패");

                setTimeout(() => {
                    emailText.textContent = originalText;
                    copyEmailBtn.setAttribute("aria-label", "이메일 주소 복사");
                }, 1500);

                return;
            }

            copyEmailBtn.classList.add("is-copied");
            emailText.textContent = "이메일 복사 완료!";
            copyEmailBtn.setAttribute("aria-label", "이메일 주소가 복사되었습니다");

            setTimeout(() => {
                copyEmailBtn.classList.remove("is-copied");
                emailText.textContent = originalText;
                copyEmailBtn.setAttribute("aria-label", "이메일 주소 복사");
            }, 1800);
        });
    }
});