/**
 * Sanjay Sparker - Robotics Lead Portfolio
 * Button functionality and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Initialize all modules
  SearchManager.init();
  TabManager.init();
  NavigationManager.init();
  ScrollAnimations.init();
});

// ============================================
// SEARCH MANAGER
// ============================================
const SearchManager = {
  init() {
    const searchBtn = document.getElementById('searchBtn');
    const mobileSearchToggle = document.getElementById('mobileSearchToggle');
    const searchClose = document.getElementById('searchClose');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    
    // Open search
    searchBtn?.addEventListener('click', () => this.open());
    mobileSearchToggle?.addEventListener('click', () => this.open());
    
    // Close search
    searchClose?.addEventListener('click', () => this.close());
    
    // Close on backdrop click
    searchOverlay?.addEventListener('click', (e) => {
      if (e.target === searchOverlay) this.close();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.open();
      }
    });
    
    // Search input
    searchInput?.addEventListener('input', (e) => {
      this.performSearch(e.target.value);
    });
  },
  
  open() {
    const overlay = document.getElementById('searchOverlay');
    const input = document.getElementById('searchInput');
    overlay?.classList.add('active');
    input?.focus();
    document.body.style.overflow = 'hidden';
  },
  
  close() {
    const overlay = document.getElementById('searchOverlay');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  },
  
  performSearch(query) {
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return;
    
    if (!query.trim()) {
      resultsContainer.innerHTML = '<p class="search-hint">Type to search projects, technologies, or sections...</p>';
      return;
    }
    
    // Simple search simulation
    resultsContainer.innerHTML = `
      <div class="search-result-item">
        <h4>Search Results for "${query}"</h4>
        <p>Try: humanoid, FOC, Mally AI, UAV, PX4, actuators...</p>
      </div>
    `;
  }
};

// ============================================
// TAB MANAGER (For UAV Section)
// ============================================
const TabManager = {
  init() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        // Update active states
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        const targetContent = document.querySelector(`.tab-content[data-content="${targetTab}"]`);
        targetContent?.classList.add('active');
      });
    });
  }
};

// ============================================
// NAVIGATION MANAGER
// ============================================
const NavigationManager = {
  init() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          const offset = 80;
          const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
          
          window.scrollTo({
            top: position,
            behavior: 'smooth'
          });
          
          history.pushState(null, '', href);
          
          // Update active nav item
          document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
          const navItem = document.querySelector(`.nav-item[href="${href}"]`);
          navItem?.classList.add('active');
          
          // Close mobile sidebar if open
          const sidebar = document.getElementById('sidebar');
          const overlay = document.getElementById('sidebarOverlay');
          sidebar?.classList.remove('open');
          overlay?.classList.remove('active');
        }
      });
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    menuToggle?.addEventListener('click', () => {
      sidebar?.classList.toggle('open');
      overlay?.classList.toggle('active');
    });
    
    // Close sidebar on overlay click
    overlay?.addEventListener('click', () => {
      sidebar?.classList.remove('open');
      overlay?.classList.remove('active');
    });
    
    // Update active nav item on scroll
    this.updateActiveNavOnScroll();
  },
  
  updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
          item.classList.add('active');
        }
      });
    });
  }
};

// ============================================
// SCROLL ANIMATIONS
// ============================================
const ScrollAnimations = {
  init() {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
      gsap.from(section.querySelectorAll('.section-header'), {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
    
    // Animate cards
    gsap.from('.role-card', {
      scrollTrigger: {
        trigger: '.role-highlight',
        start: 'top 85%'
      },
      y: 40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    });
    
    gsap.from('.solution-card', {
      scrollTrigger: {
        trigger: '.solution-grid',
        start: 'top 85%'
      },
      y: 40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    });
    
    gsap.from('.actuator-card', {
      scrollTrigger: {
        trigger: '.actuator-grid',
        start: 'top 85%'
      },
      y: 40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    });
    
    gsap.from('.timeline-item', {
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top 85%'
      },
      x: -30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: 'power2.out'
    });
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
function showToast(message) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #242444;
    border: 1px solid rgba(247, 148, 29, 0.3);
    border-radius: 12px;
    padding: 16px 24px;
    color: white;
    font-size: 14px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
    z-index: 3000;
    animation: slide-up 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slide-down 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slide-up {
    from { transform: translateY(100px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes slide-down {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(100px); opacity: 0; }
  }
`;
document.head.appendChild(style);
