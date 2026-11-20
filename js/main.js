// 상담신청 접수 주소 (구글 Apps Script 웹앱 URL)
const CONSULT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwviD9gcSYYSuv_l11vrC3JgA4b7XLKclpl1WrL6Z5oCRPjR4pKKKmrFlEwN8VmxSkeIw/exec';

// ============================
// 유정노동법률사무소 - 메인 JS
// ============================

document.addEventListener('DOMContentLoaded', function () {

    // ==================
    // 네비게이션 스크롤 효과
    // ==================
    const navbar = document.getElementById('navbar');
    const scrollThreshold = 50;

    function updateNavbar() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    // ==================
    // 햄버거 메뉴
    // ==================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
            document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
        });
        // 메뉴 링크 클릭 시 닫기
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // 현재 페이지 메뉴 활성화
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ==================
    // 히어로 슬라이드쇼
    // ==================
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;
    let slideTimer = null;

    // Pexels 빌딩/도시야경 이미지 URL (직접 CDN) — 슬라이드3: 일본간판 제거 → 서울 야경으로 교체
    const slideImages = [
        'https://images.pexels.com/photos/12640885/pexels-photo-12640885.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/3142005/pexels-photo-3142005.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/10619250/pexels-photo-10619250.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/3142002/pexels-photo-3142002.jpeg?auto=compress&cs=tinysrgb&w=1920'
    ];

    // 이미지 프리로드
    slideImages.forEach((url, i) => {
        const img = new Image();
        img.onload = () => {
            if (slides[i]) slides[i].style.backgroundImage = `url('${url}')`;
        };
        img.src = url;
    });

    function goToSlide(idx) {
        if (!slides.length) return;
        slides[currentSlide].classList.remove('active');
        if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
        currentSlide = (idx + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function startSlideshow() {
        if (!slides.length) return;
        slideTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
    }

    // 인디케이터 클릭
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            clearInterval(slideTimer);
            goToSlide(parseInt(this.getAttribute('data-index')));
            slideTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
        });
    });

    startSlideshow();

    // ==================
    // 파티클 생성 (히어로)
    // ==================
    const heroParticles = document.getElementById('heroParticles');
    if (heroParticles) {
        for (let i = 0; i < 40; i++) {
            createParticle(heroParticles);
        }
    }

    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 3 + 1;
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${Math.random() * 15 + 8}s;
            animation-delay: ${Math.random() * 8}s;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;
        container.appendChild(particle);
    }

    // ==================
    // 숫자 카운트업 애니메이션
    // ==================
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current);
        }, 16);
    }

    // ==================
    // Intersection Observer - 스크롤 애니메이션
    // ==================
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-fade-up').forEach((el, i) => {
        animObserver.observe(el);
        // 히어로 섹션은 즉시 트리거
        if (el.closest('.hero')) {
            setTimeout(() => el.classList.add('visible'), i * 100);
        }
    });

    // 카드 애니메이션
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-card').forEach(el => {
        // 서비스 섹션 카드는 즉시 표시 (스크롤 위치 무관)
        if (el.closest('.services-row-3, .services-row-4')) {
            el.classList.add('visible');
        } else {
            cardObserver.observe(el);
        }
    });

    // 카운터 애니메이션
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numEl = entry.target.querySelector('.stat-num, .counter-num');
                if (numEl && numEl.getAttribute('data-count')) {
                    animateCounter(numEl);
                }
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item, .counter-item').forEach(el => {
        counterObserver.observe(el);
    });

    // ==================
    // 탭 기능 (구성원 소개)
    // ==================
    document.querySelectorAll('.member-detail-tabs').forEach(tabContainer => {
        const buttons = tabContainer.querySelectorAll('.tab-btn');
        const member = tabContainer.closest('.member-info') || tabContainer.parentElement;

        buttons.forEach(btn => {
            btn.addEventListener('click', function () {
                const targetId = this.getAttribute('data-tab');
                buttons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                member.querySelectorAll('.member-tab-content').forEach(c => c.classList.remove('active'));
                const target = member.querySelector('#' + targetId);
                if (target) target.classList.add('active');
            });
        });

        // 첫 탭 활성화
        if (buttons.length > 0) buttons[0].click();
    });

    // ==================
    // 상담신청 폼
    // ==================
    const consultForm = document.getElementById('consultForm');
    if (consultForm) {
        consultForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const btn = this.querySelector('.btn-submit');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 전송 중...';
            btn.disabled = true;

            const formData = {
                name: this.querySelector('[name="name"]').value.trim(),
                phone: this.querySelector('[name="phone"]').value.trim(),
                email: this.querySelector('[name="email"]')?.value.trim() || '',
                company: this.querySelector('[name="company"]')?.value.trim() || '',
                applicant_type: this.querySelector('[name="applicant_type"]')?.value || '',
                category: this.querySelector('[name="category"]').value,
                message: this.querySelector('[name="message"]').value.trim(),
                prefer_method: this.querySelector('[name="prefer_method"]')?.value || '상관없음',
                status: '접수',
                memo: ''
            };

            try {
                // 상담 접수 → 구글 시트 저장 + 메일 알림 (Google Apps Script)
                const response = await fetch(CONSULT_ENDPOINT, {
                    method: 'POST',
                    body: JSON.stringify(formData)
                });
                const result = await response.json();
                if (!result.ok) throw new Error(result.error || '저장 실패');
                consultForm.style.display = 'none';
                document.getElementById('formSuccess').style.display = 'block';
            } catch (error) {
                alert('죄송합니다. 상담 신청 전송 중 오류가 발생했습니다.\n전화(010-2828-1737)로 연락 주시면 바로 도와드리겠습니다.');
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        });
    }

    // ==================
    // 스무스 스크롤 + 앵커
    // ==================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ==================
    // 페이지 로드 시 앵커 처리
    // ==================
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const offset = 72;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }, 300);
    }

    // ==================
    // 전화번호 포맷
    // ==================
    const phoneInputs = document.querySelectorAll('input[name="phone"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function () {
            let v = this.value.replace(/\D/g, '');
            if (v.length <= 3) this.value = v;
            else if (v.length <= 7) this.value = v.slice(0, 3) + '-' + v.slice(3);
            else this.value = v.slice(0, 3) + '-' + v.slice(3, 7) + '-' + v.slice(7, 11);
        });
    });

    // ============================================================
    // ACTIVITIES – Live Scroll Cards 무한 루프 초기화
    // 각 카드의 act-scroll-list 항목을 복제해 끊김 없이 위로 스크롤
    // ============================================================
    document.querySelectorAll('.act-scroll-list').forEach(function (list) {
        // 1) 원본 li 목록 복제 후 뒤에 붙이기 (무한 루프용)
        var items = Array.from(list.children);
        items.forEach(function (item) {
            list.appendChild(item.cloneNode(true));
        });

        // 2) 항목 수에 따라 속도 조절 (항목 1개당 2.2s)
        var speed = Math.max(18, items.length * 2.2);
        list.style.setProperty('--scroll-duration', speed + 's');
        list.style.animationDuration = speed + 's';
    });

    console.log('✅ 유정노동법률사무소 웹사이트 초기화 완료');
});
