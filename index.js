document.addEventListener('DOMContentLoaded', () => {
    // 1. 모바일 햄버거 메뉴 토글 로직
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-item');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('show');
    });

    // 모바일에서 링크 클릭 시 메뉴 닫기
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('show');
        });
    });

    // 2. 스크롤 위치에 따른 Navbar 스타일 변경 및 Active 메뉴 감지
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, footer');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // 헤더 그림자 효과 추가
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 현재 보이는 섹션 감지
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;

            // 화면 상단에서 약간 여유(100px)를 두고 감지
            if (scrollY >= (sectionTop - 100)) {
                currentSection = section.getAttribute('id');
            }
        });

        // 현재 섹션에 맞는 메뉴 아이템 활성화
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });
});