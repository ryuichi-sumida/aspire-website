document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    mobileBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileBtn.classList.toggle('active');
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileBtn.classList.remove('active');
                }
            }
        });
    });

    // Language Toggle (EN/JA)
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        let currentLang = localStorage.getItem('aspire-lang') || 'en';

        function applyLanguage(lang) {
            currentLang = lang;
            localStorage.setItem('aspire-lang', lang);
            document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';
            langToggle.querySelector('.lang-label').textContent = lang === 'en' ? 'JA' : 'EN';

            document.querySelectorAll('[data-en][data-ja]').forEach(el => {
                const text = el.getAttribute('data-' + lang);
                if (text !== null && text !== '') {
                    el.textContent = text;
                } else if (lang === 'ja' && el.getAttribute('data-ja') === '') {
                    // Empty ja means hide this element in Japanese
                    el.style.display = 'none';
                }
            });

            // Restore hidden elements when switching back to English
            if (lang === 'en') {
                document.querySelectorAll('[data-ja=""]').forEach(el => {
                    el.style.display = '';
                });
            }
        }

        // Apply saved language on load
        if (currentLang === 'ja') {
            applyLanguage('ja');
        }

        langToggle.addEventListener('click', () => {
            applyLanguage(currentLang === 'en' ? 'ja' : 'en');
        });
    }
});
