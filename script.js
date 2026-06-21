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
        if (!toast || !toastMessage) return;
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

    // Declare detailsModal here so it's in scope for the window click handler below
    const detailsModal = document.getElementById('detailsModal');
    const closeDetailsBtn = document.getElementById('closeDetailsModal');
    const detailsContent = document.getElementById('detailsModalContent');

    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        if (!modal) return;
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
        if (contactModal && e.target === contactModal) {
            closeModal(contactModal);
        }
        if (detailsModal && e.target === detailsModal) {
            closeModal(detailsModal);
        }
    });

    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (contactModal && contactModal.classList.contains('active')) closeModal(contactModal);
            if (detailsModal && detailsModal.classList.contains('active')) closeModal(detailsModal);
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
    // detailsModal, closeDetailsBtn, detailsContent already declared above in section 6

    // Rich mockup data for item descriptions
    const portfolioDetails = {
        // Websites
        'vishvena': {
            title: 'Vishvena Techno Solutions',
            category: 'IT Solutions & Services Website',
            desc: 'A complete corporate web application showcasing digital consulting, software products, and customer integration services. Features a responsive layout, modern contact pages, and quick load speeds optimized for search rankings.',
            linkText: 'Visit Live Site',
            url: 'https://vishvena.com/'
        },
        'sireesha': {
            title: 'Sireesha Nursing Home',
            category: 'Healthcare Landing Page',
            desc: 'A medical information portal built to help local patients view clinic working hours, schedule outpatient appointments, and access clinical descriptions. Fully compliant with patient privacy practices and responsive layouts.',
            linkText: 'Visit Clinic Portal',
            url: 'https://sireeshanursinghome.com/'
        },
        'sreepoly': {
            title: 'Sreepoly Clinic & Dental',
            category: 'Dental Care Practice Website',
            desc: 'A modern landing page matching orthodontic and general dentistry services. Contains clinic services, custom booking features, patient ratings, and location lookup details.',
            linkText: 'Visit Practice Site',
            url: 'https://sites.google.com/view/dr-sree-poly-clinic-dental'
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
        'political-quotes': {
            title: 'Political Quotes Master',
            category: 'Quotes',
            desc: 'Discover 100+ powerful political quotes that shaped history and inspire change. From Churchill to Mandela, Gandhi to Lincoln – timeless insights at your fingertips..',
            linkText: 'View on Google Play',
            url: 'https://play.google.com/store/apps/details?id=political.quotesmaster'
        },
        'hanuman-stotra': {
            title: 'Hanuman Stotra',
            category: 'Gods',
            desc: 'Powerful Mantras brings together a rich collection of sacred Hanuman stotras, kavachams, mantras, and namavalis in Telugu..',
            linkText: 'View on Google Play',
            url: 'https://play.google.com/store/apps/details?id=hanuman.stotra'
        },
        'mad-carz': {
            title: 'MadCarz',
            category: 'Games',
            desc: 'Extreme Drive Challenge — a fast-paced driving game where balance and timing are everything!.Drive across tricky bridges, steep ramps, and wild obstacles in a physics-based adventure that tests your reflexes and control.',
            linkText: 'View on Google Play',
            url: 'https://play.google.com/store/apps/details?id=com.techbrainz002.madcarz'
        },


        'task-reminder': {
            title: 'Task Reminder Android App',
            category: 'Productivity Tool',
            desc: 'A smart daily planner and checklist application that schedules persistent notifications and alarm alerts for important deadlines. Syncs with local storage for secure data control.',
            linkText: 'View Source on GitHub',
            url: 'https://github.com'
        },
        'weather-alert': {
            title: 'Weather Alert Android App',
            category: 'Utilities',
            desc: 'A minimal real-time weather alerts and daily forecast application using modern public weather APIs. Offers responsive home widgets and low power consumption design.',
            linkText: 'View on Google Play',
            url: 'https://play.google.com/store'
        },
        'finance-manager': {
            title: 'Finance Manager Android App',
            category: 'Finance Tracker',
            desc: 'A private dashboard and budgeting tracker that visualizes monthly cash flows. Users can configure custom spend categories, set limits, and export monthly CSV sheets.',
            linkText: 'View Source on GitHub',
            url: 'https://github.com'
        },
        // Books
        'positive-thinking': {
            title: 'Learn Body Language: simple and easy learning',
            category: 'Self-Help Book published on Kindle',
            desc: 'This eBook provides an in-depth exploration of body language, including the definition, basics, and important aspects such as posture, gestures, facial expression, eye contact, and interpretation..',
            linkText: 'Find on Amazon Kindle',
            url: 'https://www.amazon.in/dp/B0BVGSRS71'
        },
        'success-mindset': {
            title: 'Sri Lalitha Stotravani – శ్రీ లలితా స్తోత్రవాణి',
            category: 'Devotional Book',
            desc: 'devotional Telugu ebook featuring traditional stotras, shlokas, and namavalis dedicated to Goddess Lalitha Tripurasundari, the supreme embodiment of divine beauty, grace, and Shakti. .',
            linkText: 'Find on Amazon Store',
            url: 'https://www.amazon.in/dp/B0GNP9DHY9'
        },
        'focus-discipline': {
            title: 'Timmy and the Quest for Friendship: An Adventure of Courage and Hope',
            category: 'Story Book',
            desc: 'story about a young boy named Timmy, who sets out on a dangerous journey with his friends to save their world from darkness..',
            linkText: 'Find on Amazon Store',
            url: 'https://www.amazon.com/dp/B0BVT3QXJH'
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
