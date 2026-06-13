document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. STICKY HEADER & SCROLL EFFECTS
       ========================================================================== */
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       2. ACTIVE LINK HIGHLIGHTING ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section, main');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100; // offset for top header bar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                current = section.getAttribute('id');
            }
        });

        // Corner case: if we are at the very bottom, make Contact active
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            current = 'contact';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       3. MOBILE RESPONSIVE NAV HAMBURGER MENU
       ========================================================================== */
    const mobileToggle = document.getElementById('mobileNavToggle');
    const primaryNav = document.getElementById('primaryNavigation');

    if (mobileToggle && primaryNav) {
        mobileToggle.addEventListener('click', () => {
            const isOpened = mobileToggle.getAttribute('aria-expanded') === 'true';

            mobileToggle.setAttribute('aria-expanded', !isOpened);
            mobileToggle.classList.toggle('active');
            primaryNav.classList.toggle('active');

            // Hamburger visual morph
            const bars = mobileToggle.querySelectorAll('.hamburger-bar');
            if (bars.length === 3) {
                if (!isOpened) {
                    bars[0].style.transform = 'translateY(8px) rotate(45deg)';
                    bars[1].style.opacity = '0';
                    bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
                } else {
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            }
        });

        // Close nav drawer on link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.classList.remove('active');
                primaryNav.classList.remove('active');
                const bars = mobileToggle.querySelectorAll('.hamburger-bar');
                if (bars.length === 3) {
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            });
        });
    }

    /* ==========================================================================
       4. TOAST NOTIFICATION UTILITY
       ========================================================================== */
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');

    function showToast(message, duration = 3000) {
        toastMessage.textContent = message;
        toast.classList.add('active');

        setTimeout(() => {
            toast.classList.remove('active');
        }, duration);
    }

    /* ==========================================================================
   5. RESUME DOWNLOAD HANDLER
   ========================================================================== */
    const downloadBtn = document.getElementById('downloadResumeBtn');

    if (downloadBtn) {

        downloadBtn.addEventListener('click', () => {

            const link = document.createElement('a');

            link.href = 'assets/Goutham_Varma_Resume.pdf';

            link.download = 'Goutham_Varma_Resume.pdf';

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

        });

    }

    /* ==========================================================================
       6. CONTACT FORM MODAL
       ========================================================================== */
    const contactModal = document.getElementById('contactModal');
    const closeContactBtn = document.getElementById('closeContactModal');
    const openContactButtons = document.querySelectorAll('.open-contact-modal');
    const contactForm = document.getElementById('contactForm');

    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent double scrollbars
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    openContactButtons.forEach(btn => {
        btn.addEventListener('click', () => openModal(contactModal));
    });

    if (closeContactBtn) {
        closeContactBtn.addEventListener('click', () => closeModal(contactModal));
    }

    // Close modal on background click
    window.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeModal(contactModal);
        }
        if (e.target === detailsModal) {
            closeModal(detailsModal);
        }
    });

    // Handle form submit
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                await emailjs.send(
                    'service_y75xpct',
                    'template_vyr30a8',
                    {
                        name: document.getElementById('contactName').value,
                        email: document.getElementById('contactEmail').value,
                        title: document.getElementById('contactSubject').value,
                        message: document.getElementById('contactMessage').value
                    }
                );

                showToast('Message sent successfully!');
                contactForm.reset();
                closeModal(contactModal);
            } catch (error) {
                console.error(error);
                showToast('Failed to send message.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    }

    /* ==========================================================================
       7. DETAILS MODAL (PROJECTS, APPS & BOOKS DESCRIPTION INJECTION)
       ========================================================================== */
    const detailsModal = document.getElementById('detailsModal');
    const closeDetailsBtn = document.getElementById('closeDetailsModal');
    const detailsContent = document.getElementById('detailsModalContent');

    // Rich mockup data for item descriptions
    const portfolioDetails = {
        // Websites
        'vishvena': {
            title: 'Vishvena Techno Solutions',
            category: 'IT Solutions & Services Website',
            desc: 'A complete corporate web application showcasing digital consulting, software products, and customer integration services. Features a responsive layout, modern contact pages, and quick load speeds optimized for search rankings.',
            linkText: 'Visit Live Site',
            url: 'https://example.com/vishvena'
        },
        'sireesha': {
            title: 'Sireesha Nursing Home',
            category: 'Healthcare Landing Page',
            desc: 'A medical information portal built to help local patients view clinic working hours, schedule outpatient appointments, and access clinical descriptions. Fully compliant with patient privacy practices and responsive layouts.',
            linkText: 'Visit Clinic Portal',
            url: 'https://example.com/sireesha'
        },
        'sreepoly': {
            title: 'Sreepoly Clinic & Dental',
            category: 'Dental Care Practice Website',
            desc: 'A modern landing page matching orthodontic and general dentistry services. Contains clinic services, custom booking features, patient ratings, and location lookup details.',
            linkText: 'Visit Practice Site',
            url: 'https://example.com/sreepoly'
        },
        'enlight': {
            title: 'Enlight Clinics',
            category: 'Healthcare Service Landing Page',
            desc: 'A wellness and specialized therapy resource portal designed to catalog service locations, specialist directories, and healthcare programs. Optimized for speed and Local SEO.',
            linkText: 'Visit Service Site',
            url: 'https://example.com/enlight'
        },
        'bhuvi': {
            title: 'Bhuvi Dental Care',
            category: 'Dental Care Clinic Portal',
            desc: 'A localized dental care responsive website with appointment booking integrations, service catalogs, and oral health guidelines for patients.',
            linkText: 'Visit Clinic Site',
            url: 'https://example.com/bhuvi'
        },
        // Apps
        'daily-motivation': {
            title: 'Daily Motivation Android App',
            category: 'Inspiration & Wellness App',
            desc: 'An Android app designed to push daily quotes, goal trackers, and mental focus exercises. Built using lightweight Java/Kotlin components and integrated with local notification engines.',
            linkText: 'View on Google Play',
            url: 'https://play.google.com/store'
        },
        'health-tracker': {
            title: 'Health Tracker Android App',
            category: 'Fitness & Health Log',
            desc: 'A personal dashboard app for calorie counting, daily steps logs, and water intake calculations. Uses native storage layers for secure locally retained data.',
            linkText: 'View Source on GitHub',
            url: 'https://github.com'
        },
        'study-planner': {
            title: 'Study Planner Android App',
            category: 'Student Productivity Tool',
            desc: 'A clean calendar and task schedule manager for students. Supports custom checklists, grade analytics, and notification alarms before exam periods.',
            linkText: 'View on Google Play',
            url: 'https://play.google.com/store'
        },
        // Books
        'positive-thinking': {
            title: 'The Power of Positive Thinking',
            category: 'Self-Help Book published on Kindle',
            desc: 'A motivational book detailing structured approaches to daily mindfulness, building supportive habits, and reframing obstacles into positive action points.',
            linkText: 'Find on Amazon Kindle',
            url: 'https://amazon.com'
        },
        'success-mindset': {
            title: 'Success Mindset',
            category: 'Growth & Business Success Book',
            desc: 'A professional growth guide outlining the core concepts of grit, continuous education, and establishing robust systems for workflow optimization.',
            linkText: 'Find on Amazon Store',
            url: 'https://amazon.com'
        },
        'focus-discipline': {
            title: 'Focus, Discipline & Consistency',
            category: 'Goal Achievement Strategies Book',
            desc: 'A book focused on deep-work routines, eliminating distractions, and creating daily workflows that lead to compounding long-term success.',
            linkText: 'Find on Amazon Store',
            url: 'https://amazon.com'
        }
    };

    // Attach click events to Website "Visit Website" buttons
    document.querySelectorAll('.open-project-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-project');
            injectModalContent(portfolioDetails[key]);
            openModal(detailsModal);
        });
    });

    // Attach click events to App buttons
    document.querySelectorAll('.open-play-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-app');
            injectModalContent(portfolioDetails[key]);
            openModal(detailsModal);
        });
    });

    // Attach click events to Book buttons
    document.querySelectorAll('.open-book-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-book');
            injectModalContent(portfolioDetails[key]);
            openModal(detailsModal);
        });
    });

    if (closeDetailsBtn) {
        closeDetailsBtn.addEventListener('click', () => closeModal(detailsModal));
    }

    function injectModalContent(item) {
        if (!item) return;
        detailsContent.innerHTML = `
            <div class="detail-modal-header">
                <h2>${item.title}</h2>
                <span class="detail-modal-tag">${item.category}</span>
            </div>
            <div class="detail-modal-body">
                <p>${item.desc}</p>
            </div>
            <div class="detail-modal-actions">
                <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn-primary">${item.linkText}</a>
                <button class="btn-secondary" onclick="document.getElementById('closeDetailsModal').click()">Close Details</button>
            </div>
        `;
    }

});
