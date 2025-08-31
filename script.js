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

// Fullscreen profile image functionality
function initializeFullscreenImage() {
  const profileImage = document.getElementById('profileImage');
  const fullscreenModal = document.getElementById('fullscreenModal');
  const closeBtn = document.getElementById('closeBtn');

  // Open fullscreen when profile image is clicked
  profileImage.addEventListener('click', () => {
    fullscreenModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  });

  // Close fullscreen when close button is clicked
  closeBtn.addEventListener('click', () => {
    fullscreenModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
  });

  // Close fullscreen when clicking outside the image
  fullscreenModal.addEventListener('click', (e) => {
    if (e.target === fullscreenModal) {
      fullscreenModal.classList.remove('active');
      document.body.style.overflow = 'auto'; // Restore scrolling
    }
  });

  // Close fullscreen with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fullscreenModal.classList.contains('active')) {
      fullscreenModal.classList.remove('active');
      document.body.style.overflow = 'auto'; // Restore scrolling
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // ✅ Scroll to top only if page is reloaded
  if (performance.navigation.type === 1) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Initialize typing effect
  roleEl = document.getElementById("dynamicRoles");
  if (roleEl) typeRole();

  // Initialize fullscreen image functionality
  initializeFullscreenImage();

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
