document.addEventListener("DOMContentLoaded", () => {
  
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn.querySelector('i');
  const htmlTag = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlTag.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlTag.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlTag.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }

  const langToggle = document.querySelector('.lang-toggle');
  const langBtns = document.querySelectorAll('.lang-btn');
  const translatableElements = document.querySelectorAll('[data-en][data-fa]');
  const bodyTag = document.body;

  function setLanguage(lang) {
    bodyTag.classList.add('lang-changing');
    setTimeout(() => {
      if (lang === 'fa') {
        htmlTag.setAttribute('dir', 'rtl');
        htmlTag.setAttribute('lang', 'fa');
      } else {
        htmlTag.setAttribute('dir', 'ltr');
        htmlTag.setAttribute('lang', 'en');
      }
      translatableElements.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
      });
      langBtns.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      bodyTag.classList.remove('lang-changing');
    }, 300); 
  }

  langToggle.addEventListener('click', () => {
    const currentLang = htmlTag.getAttribute('lang');
    const newLang = currentLang === 'en' ? 'fa' : 'en';
    setLanguage(newLang);
  });

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  const sections = document.querySelectorAll('.section-scroll-target');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserverOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', 
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => navObserver.observe(section));

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active'); 
    });
  });

  const gamingBtn = document.getElementById('gaming-btn');
  const gamingContent = document.getElementById('gaming-content');

  gamingBtn.addEventListener('click', () => {
    gamingBtn.classList.toggle('active');
    gamingContent.classList.toggle('active');
  });

  const downloadCvBtn = document.getElementById('download-cv-btn');
  
  downloadCvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const currentLang = htmlTag.getAttribute('lang');
    
    if (currentLang === 'fa') {
      const link = document.createElement('a');
      link.href = 'resume-fa.pdf';
      link.download = 'Moein-Sedghi-Resume-FA.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } 
    else {
      const link = document.createElement('a');
      link.href = 'resume-en.pdf';
      link.download = 'Moein-Sedghi-Resume-EN.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });

  const timelineItems = document.querySelectorAll('.timeline-item');
  const specCards = document.querySelectorAll('.spec-card');

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });

  timelineItems.forEach(item => timelineObserver.observe(item));

  const setupObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        specCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('in-view');
          }, index * 200);
        });
        setupObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const setupSection = document.getElementById('setup');
  if (setupSection) {
    setupObserver.observe(setupSection);
  }

  const skillsSection = document.getElementById('skills');
  const skillCards = document.querySelectorAll('.skill-card');
  const counters = document.querySelectorAll('.counter');
  const rings = document.querySelectorAll('.ring-progress');
  
  let skillsAnimated = false;

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  };

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        skillCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('in-view');
          }, index * 150);
        });
        setTimeout(() => {
          rings.forEach(ring => {
            const percent = +ring.getAttribute('data-percent');
            const circumference = 2 * Math.PI * 50;
            const offset = circumference - (percent / 100) * circumference;
            ring.style.strokeDashoffset = offset;
          });
        }, 500);
        setTimeout(() => {
          counters.forEach(counter => animateCounter(counter));
        }, 500);
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }

  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzeqyb_McNL4spS6lSfj2Yah50HcnJzOSmu8k7cQwGlcRdy5gOgMIGdLLkkcrMj3N16/exec';

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const isFa = htmlTag.getAttribute('lang') === 'fa';
      
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = isFa 
        ? '<i class="fa-solid fa-spinner fa-spin"></i> در حال ارسال...' 
        : '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      const formData = new FormData(contactForm);

      fetch(scriptURL, {
        method: 'POST',
        body: formData
      })
      .then(response => {
        alert(isFa ? 'پیام شما با موفقیت ارسال شد! 🚀' : 'Your message has been sent successfully! 🚀');
        contactForm.reset();
      })
      .catch(error => {
        console.error('Error!', error.message);
        alert(isFa ? 'خطا در ارسال پیام. لطفاً اتصال اینترنت خود را بررسی کنید.' : 'Failed to send message. Please check your internet connection.');
      })
      .finally(() => {
        submitBtn.innerHTML = originalBtnHTML;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      });
    });
  }

});