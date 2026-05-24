document.addEventListener('DOMContentLoaded', () => {
  // ======= SCROLL REVEAL =======
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings = entry.target.parentElement?.querySelectorAll('.reveal:not(.active)');
          let delay = 0;
          if (siblings) {
            siblings.forEach((el, idx) => {
              if (el === entry.target) delay = idx * 80;
            });
          }
          setTimeout(() => {
            entry.target.classList.add('active');
          }, delay);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  // ======= SMOOTH ANCHOR =======
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ======= NAV SCROLL SHADOW (via CSS class) =======
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // ======= MOCKUP TYPING EFFECT (requestAnimationFrame) =======
  const mkHeadline = document.querySelector('.mk-headline');
  const mkSubs = document.querySelectorAll('.mk-sub');

  if (mkHeadline) {
    const duration = 1000;
    const start = performance.now();
    const grow = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      mkHeadline.style.width = (progress * 100) + '%';
      if (progress < 1) requestAnimationFrame(grow);
    };
    requestAnimationFrame(grow);
  }

  if (mkSubs.length) {
    setTimeout(() => {
      mkSubs.forEach((el, i) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transition = 'opacity 0.5s';
        }, i * 300);
      });
    }, 1200);
  }
});
