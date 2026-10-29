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

    // 2. Active Navigation Link Highlighting based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else if (linkHref !== currentPage && !linkHref.startsWith('#')) {
            link.classList.remove('active');
        }
    });

    // 3. Mobile Navigation Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

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
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 9. Auto-Fill Package in Contact Form from URL Parameter (e.g. contact.html?package=Golden%20Glamour)
    const packageInput = document.getElementById('preferredPackage');
    if (packageInput) {
        const urlParams = new URLSearchParams(window.location.search);
        const pkgParam = urlParams.get('package');
        if (pkgParam) {
            packageInput.value = pkgParam;
            packageInput.style.borderColor = '#9472B7';
            packageInput.style.backgroundColor = '#F4EFFB';
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
});
