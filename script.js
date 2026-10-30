/* ==========================================================================
   AMYRA'S PARTY DECOR - SCRIPT
   Multi-page support, active navigation, soft pastel theme, FAQ accordions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Current Year in Footer
    const yearElem = document.getElementById('currentYear');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }

    // 2. Active Navigation Link Highlighting (both Header & Mobile Bottom Nav)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const allNavLinks = document.querySelectorAll('.nav-list a, .mobile-bottom-nav .bnav-item');
    
    allNavLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else if (linkHref && !linkHref.startsWith('#')) {
            link.classList.remove('active');
        }
    });

    // 3. Mobile Navigation Drawer with Overlay & Close Button
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const drawerClose = document.getElementById('drawerClose');

    function openMobileMenu() {
        if (navMenu) navMenu.classList.add('active');
        if (menuToggle) menuToggle.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        if (navMenu) navMenu.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navMenu && navMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (drawerClose) {
        drawerClose.addEventListener('click', closeMobileMenu);
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMobileMenu);
    }

    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // 4. Sticky Header and Scroll-to-Top Button
    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        if (scrollTopBtn) {
            if (window.scrollY > 350) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Headline Word Switcher (on Home page)
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const words = ['Pure Magic', 'Unforgettable', 'Spectacular', 'Timeless Moments', 'Grand Fairytales'];
        let wordIndex = 0;

        setInterval(() => {
            wordIndex = (wordIndex + 1) % words.length;
            typingText.style.opacity = '0';
            typingText.style.transform = 'translateY(8px)';
            
            setTimeout(() => {
                typingText.textContent = words[wordIndex];
                typingText.style.opacity = '1';
                typingText.style.transform = 'translateY(0)';
            }, 300);
        }, 2800);
    }

    // 6. Stat Metric Counter on Scroll (if present)
    const metricVals = document.querySelectorAll('.metric-val');
    let countersAnimated = false;

    const startCounters = () => {
        metricVals.forEach(val => {
            const target = +val.getAttribute('data-target');
            let count = 0;
            const step = Math.ceil(target / 45);
            const speed = target > 500 ? 18 : 35;

            const updateNumber = () => {
                count += step;
                if (count < target) {
                    val.innerText = count + (target === 99 || target === 100 ? '%' : '+');
                    setTimeout(updateNumber, speed);
                } else {
                    val.innerText = target + (target === 99 || target === 100 ? '%' : '+');
                }
            };
            updateNumber();
        });
    };

    const metricsContainer = document.querySelector('.hero-metrics');
    if (metricsContainer && metricVals.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !countersAnimated) {
                startCounters();
                countersAnimated = true;
            }
        }, { threshold: 0.3 });

        observer.observe(metricsContainer);
    }

    // 7. Gallery Masonry Category Filtering (if present)
    const filterTabs = document.querySelectorAll('.filter-tab');
    const masonryItems = document.querySelectorAll('.masonry-item');

    if (filterTabs.length > 0 && masonryItems.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const filterVal = tab.getAttribute('data-filter');

                masonryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filterVal === 'all' || category === filterVal) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 250);
                    }
                });
            });
        });
    }

    // 8. FAQ Accordion Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question, .faq-header');
        if (question) {
            question.addEventListener('click', (e) => {
                e.preventDefault();
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 9. Auto-Fill Package in Contact Form from URL Parameter (e.g. contact.html?package=Blush%20Elegance)
    const packageInput = document.getElementById('preferredPackage');
    if (packageInput) {
        const urlParams = new URLSearchParams(window.location.search);
        const pkgParam = urlParams.get('package');
        if (pkgParam) {
            packageInput.value = pkgParam;
            packageInput.style.borderColor = '#FF2A85';
            packageInput.style.backgroundColor = '#FFF0F6';
            setTimeout(() => {
                packageInput.style.borderColor = '';
                packageInput.style.backgroundColor = '';
            }, 1800);
        }
    }

    // 10. Booking / Inquiry Form Submission
    const bookingForm = document.getElementById('bookingForm');
    const formStatus = document.getElementById('formStatus');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('fullName').value.trim();
            const eventType = document.getElementById('eventType').value;
            const eventDate = document.getElementById('eventDate').value;
            const packageVal = document.getElementById('preferredPackage').value.trim() || 'Custom Consultation';

            if (formStatus) {
                formStatus.className = 'status-msg success';
                formStatus.innerHTML = `✓ Thank you <strong>${name}</strong>! Your inquiry for <strong>${eventType}</strong> on <strong>${eventDate}</strong> (${packageVal}) has been received successfully. Our team will review and get in touch with your customized theme moodboard soon!`;
                formStatus.style.display = 'block';
                bookingForm.reset();
            }
        });
    }

    // 11. SCROLL-REACTIVE FLOATING & SWAYING BALLOON SKY ANIMATION ("Hawa me Laharte Balloons")
    initFloatingBalloons();

    function initFloatingBalloons() {
        let container = document.getElementById('balloonAtmosphere');
        if (!container) {
            container = document.createElement('div');
            container.id = 'balloonAtmosphere';
            container.className = 'balloon-atmosphere';
            document.body.prepend(container);
        } else {
            container.innerHTML = '';
        }

        const colors = ['orange', 'pink', 'purple', 'cyan'];
        const isMobile = window.innerWidth <= 768;
        const totalBalloons = isMobile ? 8 : 14;
        const balloonInstances = [];

        // Curved silk string SVG template
        const stringSvg = `
            <svg class="balloon-string-svg" viewBox="0 0 22 70">
                <path class="balloon-string-path" d="M11,0 Q3,20 11,35 T11,70" />
            </svg>
        `;

        for (let i = 0; i < totalBalloons; i++) {
            const el = document.createElement('div');
            const color = colors[i % colors.length];
            el.className = `balloon-item balloon-color-${color}`;

            // Size variation: crisp & delicate for mobile
            const size = isMobile 
                ? (28 + (i % 3) * 6) 
                : (40 + (i % 4) * 8);
            const height = Math.round(size * 1.24);

            el.innerHTML = `
                <div class="balloon-body" style="width: ${size}px; height: ${height}px;"></div>
                <div class="balloon-knot"></div>
                ${stringSvg}
            `;

            container.appendChild(el);

            // Distribution on left & right margins (never blocking center content)
            let targetXPercent;
            if (i % 2 === 0) {
                targetXPercent = isMobile ? (1 + (i * 2.1) % 6) : (2 + (i * 2.5) % 12);
            } else {
                targetXPercent = isMobile ? (88 + (i * 2.1) % 7) : (86 + (i * 2.2) % 10);
            }

            // Stagger initial Y across screen height
            const winHeight = window.innerHeight || 800;
            const baseY = (i / totalBalloons) * winHeight * 1.2;

            balloonInstances.push({
                el: el,
                xPercent: targetXPercent,
                baseY: baseY,
                speedFactor: 0.35 + (i % 4) * 0.15, // Parallax depth factor
                floatSpeed: 0.03 + (i % 3) * 0.02,  // Ambient upward breeze float
                swayAmp: isMobile ? (6 + (i % 3) * 4) : (14 + (i % 4) * 6),
                swaySpeed: 0.0016 + (i % 3) * 0.0007,
                phase: (i * 1.6),
                tiltFactor: 0.18 + (i % 3) * 0.06,
                opacity: isMobile ? (0.82 + (i % 2) * 0.15) : (0.85 + (i % 3) * 0.08)
            });
        }

        // Mathematical wrap function (prevents negative modulo freeze)
        function wrapCoord(val, min, max) {
            const range = max - min;
            return ((((val - min) % range) + range) % range) + min;
        }

        function getScrollTop() {
            return window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
        }

        let lastScrollY = getScrollTop();
        let scrollVelocity = 0;
        let targetVelocity = 0;

        function updateVelocity() {
            const currentY = getScrollTop();
            const delta = currentY - lastScrollY;
            targetVelocity = delta * 0.6;
            lastScrollY = currentY;
        }

        window.addEventListener('scroll', updateVelocity, { passive: true });
        window.addEventListener('touchmove', updateVelocity, { passive: true });
        window.addEventListener('wheel', updateVelocity, { passive: true });

        // Continuous silky-smooth 60fps RAF loop
        function animateBalloons(time) {
            // Spring damping for responsive inertia
            scrollVelocity += (targetVelocity - scrollVelocity) * 0.12;
            targetVelocity *= 0.92;

            const winH = window.innerHeight || 800;
            const winW = window.innerWidth || 360;
            const minY = -120;
            const maxY = winH + 80;
            const currentScroll = getScrollTop();

            balloonInstances.forEach((b) => {
                // Vertical motion: Scroll parallax + continuous gentle upward drift ("hawa me lehrate balloons")
                const naturalFloat = (time * b.floatSpeed);
                const rawY = b.baseY - (currentScroll * b.speedFactor) - naturalFloat;
                const computedY = wrapCoord(rawY, minY, maxY);

                // Horizontal sine-wave breeze swaying
                const swayX = Math.sin(time * b.swaySpeed + b.phase) * b.swayAmp;
                const windTilt = Math.sin(time * 0.0014 + b.phase) * 6 - (scrollVelocity * b.tiltFactor);
                const xPx = (b.xPercent / 100) * winW + swayX;

                // Hardware-accelerated 3D transform (zero CSS transition interference)
                b.el.style.transform = `translate3d(${xPx.toFixed(1)}px, ${computedY.toFixed(1)}px, 0) rotate(${windTilt.toFixed(1)}deg)`;
                b.el.style.opacity = b.opacity;
            });

            requestAnimationFrame(animateBalloons);
        }

        requestAnimationFrame(animateBalloons);

        // Re-calculate on resize / orientation change
        window.addEventListener('resize', () => {
            const newIsMobile = window.innerWidth <= 768;
            if (newIsMobile !== isMobile) {
                initFloatingBalloons();
            }
        });
    }
});
