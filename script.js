/**
 * Chitranshu Nath Nag - Developer Portfolio Script
 * Interactive logic: Typing effect, Theme switch, Skills filter,
 * Agentic AI Simulator, Copy-to-clipboard, Scrollspy, and Contact form.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Set Current Year in Footer
  const yearSpan = document.getElementById('year-span');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // -------------------------------------------------------------
  // 1. TYPING ANIMATION
  // -------------------------------------------------------------
  const typingTextEl = document.getElementById('typing-text');
  const roles = [
    'Autonomous Multi-Agent Workflows',
    'High-Performance FastAPI Backends',
    'Interactive React.js Interfaces',
    'Multimodal RAG Pipelines',
    'Secure PostgreSQL Systems'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 75;

  function typeRole() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingTextEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingTextEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(typeRole, typingSpeed);
  }

  if (typingTextEl) {
    typeRole();
  }

  // -------------------------------------------------------------
  // 2. THEME SWITCHER (Dark / Light with LocalStorage)
  // -------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('cnn_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('cnn_theme', newTheme);
      showToast(`Switched to ${newTheme} theme`);
    });
  }

  // -------------------------------------------------------------
  // 3. NAVBAR SCROLL EFFECT & MOBILE MENU
  // -------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen 
        ? '<i data-lucide="x"></i>' 
        : '<i data-lucide="menu"></i>';
      if (window.lucide) window.lucide.createIcons();
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
        if (window.lucide) window.lucide.createIcons();
      });
    });
  }

  // -------------------------------------------------------------
  // 4. SCROLLSPY (Active Navigation Highlight)
  // -------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // -------------------------------------------------------------
  // 5. SKILLS FILTERING
  // -------------------------------------------------------------
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // -------------------------------------------------------------
  // 6. INTERACTIVE AGENTIC WORKFLOW SIMULATOR
  // -------------------------------------------------------------
  const workflowData = {
    '1': {
      title: 'Step 1: User Topic & Parameter Ingestion',
      badge: 'Input State',
      description: 'The React.js frontend sends a structured request with article prompt, target tone, length, and export preferences to the FastAPI backend.',
      code: `POST /api/v1/generate-article
Payload: {
  "topic": "Autonomous AI Multi-Agent Systems in Healthcare",
  "tone": "Technical & Deep-dive",
  "max_sections": 5,
  "include_realtime_sources": true
}`
    },
    '2': {
      title: 'Step 2: Router Agent (Classification & Strategy)',
      badge: 'LangGraph Router',
      description: 'The Router Agent classifies the topic complexity, evaluates whether live web groundings are required, and generates an optimized sub-queries plan.',
      code: `class RouterState(TypedDict):
    topic: str
    requires_live_web: bool = True
    domain: str = "Biomedical & Engineering"
    sub_queries: List[str] = [
        "latest agentic clinical workflows 2026",
        "multimodal medical diagnostic accuracy",
        "regulatory compliance in agentic healthcare"
    ]`
    },
    '3': {
      title: 'Step 3: Tavily Research Agent (Live Web Intelligence)',
      badge: 'Tavily Search API',
      description: 'Parallel search queries are dispatched to Tavily API. Real-time authoritative links, excerpts, and peer-reviewed articles are gathered and deduplicated.',
      code: `async def run_tavily_research(state: RouterState):
    research_results = await tavily_client.search(
        query=state["sub_queries"],
        search_depth="advanced",
        include_raw_content=False,
        max_results=6
    )
    return {"raw_sources": research_results, "status": "RESEARCH_COMPLETE"}`
    },
    '4': {
      title: 'Step 4: Orchestrator & Parallel Worker Agents',
      badge: 'Parallel Execution',
      description: 'The Orchestrator distributes section outlines to Worker Agents running via OpenRouter. Sections are generated concurrently with verified citations and automated image placeholders.',
      code: `async def orchestrate_workers(state):
    # Concurrently launch section generation
    tasks = [
        worker_agent.generate_section(sec, state["raw_sources"])
        for sec in state["outline"]
    ]
    sections = await asyncio.gather(*tasks)
    return {"draft_sections": sections}`
    },
    '5': {
      title: 'Step 5: Reducer Agent & Markdown/PDF Export',
      badge: 'Final Assembly',
      description: 'The Reducer synthesizes sections, harmonizes tone, inserts citations, and streams clean Markdown to the React frontend with one-click PDF & DOCX export.',
      code: `final_markdown = reducer.stitch(sections, citations=True)
return {
    "article_markdown": final_markdown,
    "export_ready": ["PDF", "DOCX", "MARKDOWN"],
    "latency_seconds": 3.8
}`
    }
  };

  const stepButtons = document.querySelectorAll('.step-btn');
  const simDisplayEl = document.getElementById('simulator-display');

  function renderSimulatorStep(stepNum) {
    const data = workflowData[stepNum];
    if (!data || !simDisplayEl) return;

    simDisplayEl.innerHTML = `
      <div class="sim-step-box">
        <div class="sim-header">
          <h4 class="sim-title">
            <span>${data.title}</span>
          </h4>
          <span class="sim-badge">${data.badge}</span>
        </div>
        <div class="sim-content">
          <p>${data.description}</p>
        </div>
        <pre class="sim-code-preview"><code>${escapeHtml(data.code)}</code></pre>
      </div>
    `;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  stepButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      stepButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const step = btn.getAttribute('data-step');
      renderSimulatorStep(step);
    });
  });

  // Render initial simulator step
  renderSimulatorStep('1');

  // -------------------------------------------------------------
  // 7. COPY TO CLIPBOARD BUTTONS
  // -------------------------------------------------------------
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard && textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied: ${textToCopy}`);
        }).catch(() => {
          fallbackCopyText(textToCopy);
        });
      } else {
        fallbackCopyText(textToCopy);
      }
    });
  });

  function fallbackCopyText(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied: ${text}`);
  }

  // -------------------------------------------------------------
  // 8. CONTACT FORM SUBMISSION
  // -------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.');
        return;
      }

      // Simulate sending note & open mailto option
      const mailtoUrl = `mailto:chitranshu.233306@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
      
      formFeedback.innerHTML = `<strong>Thank you, ${name}!</strong> Opening your email client to send note to Chitranshu...`;
      formFeedback.className = 'form-feedback success';

      showToast('Opening email client...');
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);
    });
  }

  // -------------------------------------------------------------
  // 9. TOAST NOTIFICATION HELPER
  // -------------------------------------------------------------
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
});
