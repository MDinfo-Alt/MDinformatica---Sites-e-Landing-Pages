document.addEventListener('DOMContentLoaded', () => {
  // ======= SCROLL REVEAL =======
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Staggered delay for sibling elements
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

  // ======= NAV SCROLL SHADOW =======
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        nav.style.boxShadow = '0 4px 40px rgba(0,0,0,0.5)';
      } else {
        nav.style.boxShadow = 'none';
      }
    });
  }

  // ======= MOCKUP TYPING EFFECT =======
  const mkHeadline = document.querySelector('.mk-headline');
  const mkSubs = document.querySelectorAll('.mk-sub');
  if (mkHeadline) {
    let width = 0;
    const grow = setInterval(() => {
      width += 2;
      mkHeadline.style.width = width + '%';
      if (width >= 100) clearInterval(grow);
    }, 20);
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
