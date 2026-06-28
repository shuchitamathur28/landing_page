document.addEventListener('DOMContentLoaded', function () {

  // Navbar shadow on scroll
  const nav = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 30) {
      nav.style.boxShadow = '0 6px 20px rgba(0,0,0,.25)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });

  // Fade-up animation on scroll
  const fadeEls = document.querySelectorAll('.feature-card, .instructor-card, .testimonial-card, .pricing-card');
  fadeEls.forEach(el => el.classList.add('fade-up'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach(el => observer.observe(el));

  // Countdown timer (targets 7 days from page load as a demo)
  const target = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
  function updateCountdown() {
    const now = new Date().getTime();
    const diff = target - now;
    if (diff <= 0) return;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    const dEl = document.getElementById('cd-days');
    const hEl = document.getElementById('cd-hours');
    const mEl = document.getElementById('cd-mins');
    const sEl = document.getElementById('cd-secs');
    if (dEl) dEl.textContent = days;
    if (hEl) hEl.textContent = hours;
    if (mEl) mEl.textContent = mins;
    if (sEl) sEl.textContent = secs;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Enroll form fake-submit feedback
  const form = document.getElementById('enrollForm');
  const submitBtn = document.getElementById('enrollSubmitBtn');
  if (form) {
    form.addEventListener('submit', function () {
      submitBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Request Received!';
      submitBtn.disabled = true;
      setTimeout(() => {
        const modalEl = document.getElementById('enrollModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
        submitBtn.innerHTML = 'Submit & Get Callback';
        submitBtn.disabled = false;
        form.reset();
      }, 1500);
    });
  }

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});
