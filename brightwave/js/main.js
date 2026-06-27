// =============================================
// BrightWave Studio - main.js
// Written by Rohan (intern project, June 2026)
// =============================================

// wait for DOM to load before doing stuff
document.addEventListener('DOMContentLoaded', function () {

    // -------------------------------------------
    // 1. Mobile Hamburger Menu Toggle
    // -------------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });

        // close nav when any link is clicked (mobile UX)
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
            });
        });
    }

    // -------------------------------------------
    // 2. Active nav link based on current page
    // -------------------------------------------
    // get the current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-links a').forEach(function (link) {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // -------------------------------------------
    // 3. Contact Form Validation
    // -------------------------------------------
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // stop real submit since we have no backend

            let isValid = true;

            // helper to show/clear error messages
            function showError(fieldId, msgId) {
                const field = document.getElementById(fieldId);
                const msg = document.getElementById(msgId);
                if (field) field.classList.add('error');
                if (msg) msg.classList.add('show');
                isValid = false;
            }

            function clearError(fieldId, msgId) {
                const field = document.getElementById(fieldId);
                const msg = document.getElementById(msgId);
                if (field) field.classList.remove('error');
                if (msg) msg.classList.remove('show');
            }

            // reset all errors first
            const fields = ['fname', 'lname', 'email', 'service', 'message'];
            fields.forEach(function (f) {
                clearError(f, f + '_err');
            });

            // validate first name
            const fname = document.getElementById('fname');
            if (!fname || fname.value.trim() === '') {
                showError('fname', 'fname_err');
            }

            // validate last name
            const lname = document.getElementById('lname');
            if (!lname || lname.value.trim() === '') {
                showError('lname', 'lname_err');
            }

            // validate email with a basic check
            const email = document.getElementById('email');
            if (!email || email.value.trim() === '') {
                showError('email', 'email_err');
            } else if (!email.value.includes('@') || !email.value.includes('.')) {
                showError('email', 'email_err');
                document.getElementById('email_err').textContent = 'Please enter a valid email address.';
            }

            // validate service dropdown
            const service = document.getElementById('service');
            if (!service || service.value === '') {
                showError('service', 'service_err');
            }

            // validate message
            const message = document.getElementById('message');
            if (!message || message.value.trim().length < 10) {
                showError('message', 'message_err');
            }

            // if everything is fine, show success
            if (isValid) {
                const successMsg = document.getElementById('successMsg');
                if (successMsg) {
                    successMsg.classList.add('show');
                }
                contactForm.reset();

                // hide success message after 5 seconds
                setTimeout(function () {
                    successMsg.classList.remove('show');
                }, 5000);
            }
        });

        // clear error when user starts typing again
        contactForm.querySelectorAll('input, select, textarea').forEach(function (el) {
            el.addEventListener('input', function () {
                el.classList.remove('error');
                // find corresponding error message element
                const errId = el.id + '_err';
                const errEl = document.getElementById(errId);
                if (errEl) errEl.classList.remove('show');
            });
        });
    }

    // -------------------------------------------
    // 4. Simple scroll fade-in for cards
    // (basic, no heavy library)
    // -------------------------------------------
    const fadeEls = document.querySelectorAll('.service-card, .team-card, .stat-box, .price-card');

    // using IntersectionObserver - cleaner than scroll events
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        fadeEls.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(18px)';
            el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            observer.observe(el);
        });
    }

});
