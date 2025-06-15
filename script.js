// Typing effect
const roles = ["Web Developer", "Designer", "Prompt Engineer", "Multitasking Professional", "Gamer"];
let roleIndex = 0, charIndex = 0, roleEl;

function typeRole() {
  if (charIndex < roles[roleIndex].length) {
    roleEl.textContent += roles[roleIndex].charAt(charIndex++);
    setTimeout(typeRole, 100);
  } else {
    setTimeout(eraseRole, 1500);
  }
}

function eraseRole() {
  if (charIndex > 0) {
    roleEl.textContent = roles[roleIndex].substring(0, --charIndex);
    setTimeout(eraseRole, 50);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 300);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // ✅ Scroll to top only if page is reloaded
  if (performance.navigation.type === 1) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Typing effect
  roleEl = document.getElementById("dynamicRoles");
  if (roleEl) typeRole();

  // Read More Toggle
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const desc = btn.closest('.project-desc');
      const moreText = desc.querySelector('.more-text');
      if (moreText.style.display === "none") {
        moreText.style.display = "inline";
        btn.textContent = "Read less";
      } else {
        moreText.style.display = "none";
        btn.textContent = "Read more";
      }
    });
  });

  // Add smooth scroll class temporarily for navigation links
  document.documentElement.classList.add('smooth-scroll');

  // Smooth scroll on nav link click
  document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      const offset = document.querySelector('header').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });

      // Remove #fragment from URL
      history.replaceState(null, '', window.location.pathname);
    });
  });

  // Remove smooth scroll after 1s to prevent issues on reload
  setTimeout(() => {
    document.documentElement.classList.remove('smooth-scroll');
  }, 1000);
});
