document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.nav-links a');
  const contactTriggers = document.querySelectorAll('.contact-link, .contact-button');
  const modal = document.getElementById('contact-modal');
  const modalClose = document.querySelector('.modal-close');

  // Toggle mobile navigation menu
  navToggle.addEventListener('click', function() {
    nav.classList.toggle('nav-open');
    if (nav.classList.contains('nav-open')) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }
  });

  // Close nav menu when any link is clicked (useful for mobile)
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      nav.classList.remove('nav-open');
      document.body.classList.remove('nav-open');
    });
  });

  // Open contact modal when any contact trigger is clicked
  contactTriggers.forEach(function(element) {
    element.addEventListener('click', function(e) {
      e.preventDefault();
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';  // disable background scroll
    });
  });

  // Close modal when "x" button is clicked
  modalClose.addEventListener('click', function() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  });

  // Close modal if clicking outside the modal content
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  // Reveal sections on scroll (fade-in effect)
  const sections = document.querySelectorAll('.section');
  const observerOptions = { threshold: 0.1 };
  const sectionObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });
});
