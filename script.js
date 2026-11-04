
  const animateElements = document.querySelectorAll('.project-card, .skill-category, .pillar-card, .contact-card');
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });
});
