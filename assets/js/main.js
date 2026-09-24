/**
 * Jatin Singh — Portfolio Interactive Engine
 * High-performance, accessible, and lightweight vanilla JavaScript.
 * Strictly adheres to authentic professional data and security practices.
 */

(function () {
  'use strict';

  const data = window.PORTFOLIO_DATA || {};

  // ==========================================================================
  // 1. THEME MANAGEMENT (Dark Default with Light Mode Option)
  // ==========================================================================
  const THEME_KEY = 'jatin_portfolio_theme';
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || 'dark'; // Dark professional theme default
    setTheme(initialTheme);
  }

  function setTheme(theme) {
    if (theme === 'light') {
      htmlEl.setAttribute('data-theme', 'light');
      updateThemeIcon('light');
    } else {
      htmlEl.removeAttribute('data-theme');
      updateThemeIcon('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  }

  function toggleTheme() {
    const currentTheme = htmlEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    if (theme === 'light') {
      themeToggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      `;
      themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
    } else {
      themeToggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      `;
      themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  initTheme();

  // ==========================================================================
  // 2. HEADER SCROLL & PROGRESS BAR
  // ==========================================================================
  const header = document.querySelector('.site-header');
  const progressBar = document.getElementById('scroll-progress');

  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
        header.classList.remove('transparent-header');
      } else {
        header.classList.remove('scrolled');
        header.classList.add('transparent-header');
      }
    }

    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
      progressBar.setAttribute('aria-valuenow', Math.round(progress));
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ==========================================================================
  // 3. NAVIGATION SPY (Active Section Highlighting)
  // ==========================================================================
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = (window.scrollY || window.pageYOffset) + 160;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else if (link.getAttribute('href')?.startsWith('#')) {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ==========================================================================
  // 4. MOBILE DRAWER MENU
  // ==========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================================================
  // 5. SUBTLE SCROLL REVEAL (IntersectionObserver)
  // ==========================================================================
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initScrollReveal() {
    if (isReducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-item').forEach((el) => el.classList.add('revealed'));
      return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    document.querySelectorAll('.reveal-item').forEach((el) => {
      revealObserver.observe(el);
    });
  }

  // ==========================================================================
  // 6. INTERACTIVE EXPERIENCE TIMELINE (In-place Expansion)
  // ==========================================================================
  function initExperienceExpansion() {
    const expandBtn = document.getElementById('experience-expand-toggle');
    const deepDivePanel = document.getElementById('experience-deep-dive-panel');

    if (expandBtn && deepDivePanel) {
      expandBtn.addEventListener('click', () => {
        const isOpen = deepDivePanel.classList.toggle('open');
        expandBtn.setAttribute('aria-expanded', isOpen);
        expandBtn.innerHTML = isOpen
          ? `Hide Control Mapping <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"></polyline></svg>`
          : `Deep Dive &amp; Control Mapping <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
      });
    }
  }

  // ==========================================================================
  // 7. CYBERSECURITY SKILL MATRIX (Domain Tabs & Factual Descriptions)
  // ==========================================================================
  const skillTabs = document.querySelectorAll('.skill-tab-btn');
  const skillsContainer = document.getElementById('skills-container');

  function renderSkills(category = 'all') {
    if (!skillsContainer || !data.skills) return;
    const allSkills = data.skills.items || [];
    const filtered = category === 'all' ? allSkills : allSkills.filter((s) => s.category === category);

    skillsContainer.innerHTML = filtered
      .map((skill) => {
        const catObj = data.skills.categories.find((c) => c.id === skill.category);
        const catName = catObj ? catObj.name : skill.category;
        return `
          <div class="skill-card reveal-item revealed" data-category="${escapeHtml(skill.category)}">
            <div class="skill-name-row">
              <h3 class="skill-title">${escapeHtml(skill.name)}</h3>
              <span class="skill-category-badge">${escapeHtml(catName)}</span>
            </div>
            <p class="skill-description">${escapeHtml(skill.description)}</p>
          </div>
        `;
      })
      .join('');
  }

  if (skillTabs.length > 0) {
    skillTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        skillTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.getAttribute('data-category');
        renderSkills(cat);
      });
    });
    renderSkills('all');
  }

  // ==========================================================================
  // 8. PROJECT CASE STUDY MODAL (Polished 01–07 Detail View)
  // ==========================================================================
  const caseStudyModal = document.getElementById('case-study-modal');
  const caseStudyDialog = document.getElementById('case-study-dialog');
  const caseStudyCloseBtn = document.getElementById('case-study-close-btn');

  function openCaseStudy(projectId) {
    if (!caseStudyModal || !data.projects) return;
    const proj = data.projects.find((p) => p.id === projectId);
    if (!proj) return;

    const modalKicker = document.getElementById('modal-case-kicker');
    const modalTitle = document.getElementById('modal-case-title');
    const modalBody = document.getElementById('modal-case-body');

    if (modalKicker) modalKicker.textContent = proj.categoryLabel || 'PROJECT CASE STUDY';
    if (modalTitle) modalTitle.textContent = proj.title;

    let html = `
      <div class="case-study-section-item">
        <div class="case-study-num">01 — OVERVIEW</div>
        <div class="case-study-heading">Strategic Context</div>
        <p class="case-study-text">${escapeHtml(proj.summary)}</p>
      </div>

      <div class="case-study-section-item">
        <div class="case-study-num">02 — PROBLEM</div>
        <div class="case-study-heading">Challenge &amp; Risk Parameters</div>
        <p class="case-study-text">${escapeHtml(proj.problem)}</p>
      </div>

      <div class="case-study-section-item">
        <div class="case-study-num">03 — SOLUTION</div>
        <div class="case-study-heading">Engineering &amp; Security Countermeasures</div>
        <p class="case-study-text">${escapeHtml(proj.solution || proj.summary)}</p>
      </div>

      <div class="case-study-section-item">
        <div class="case-study-num">04 — ARCHITECTURE</div>
        <div class="case-study-heading">System Pipeline &amp; Data Boundaries</div>
        <p class="case-study-text">${escapeHtml(proj.architectureDescription || '')}</p>
        ${
          proj.architectureSteps
            ? `
          <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 12px;">
            ${proj.architectureSteps
              .map(
                (step) => `
              <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); padding: 10px 14px; border-radius: 8px;">
                <span style="font-family: monospace; font-size: 11px; color: var(--accent-light, #9b95ff); font-weight: 600;">${escapeHtml(step.label)}:</span>
                <span style="font-size: 13px; color: var(--text-secondary, #b8bdca); margin-left: 6px;">${escapeHtml(step.desc)}</span>
              </div>
            `
              )
              .join('')}
          </div>
        `
            : ''
        }
      </div>

      <div class="case-study-section-item">
        <div class="case-study-num">05 — TECHNOLOGY</div>
        <div class="case-study-heading">Technical Stack &amp; Protocols</div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
          ${(proj.technologies || [])
            .map(
              (tech) =>
                `<span style="background: rgba(124, 115, 255, 0.12); border: 1px solid rgba(124, 115, 255, 0.3); color: var(--accent-light, #9b95ff); padding: 4px 12px; border-radius: 20px; font-size: 12px; font-family: monospace;">${escapeHtml(tech)}</span>`
            )
            .join('')}
        </div>
      </div>

      <div class="case-study-section-item">
        <div class="case-study-num">06 — IMPLEMENTATION</div>
        <div class="case-study-heading">Engineering Discipline</div>
        <p class="case-study-text">${escapeHtml(proj.implementation || proj.myContribution || '')}</p>
      </div>

      <div class="case-study-section-item">
        <div class="case-study-num">07 — RESULT</div>
        <div class="case-study-heading">Verified Posture &amp; Performance</div>
        <p class="case-study-text">${escapeHtml(proj.result || 'Successfully implemented meeting all technical and accessibility criteria.')}</p>
      </div>

      <div class="case-study-actions">
        ${
          proj.github
            ? `
          <a href="${escapeHtml(proj.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            View Repository
          </a>
        `
            : ''
        }
        ${
          proj.liveDemo
            ? `
          <a href="${escapeHtml(proj.liveDemo)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Explore Live Demo
          </a>
        `
            : ''
        }
      </div>
    `;

    if (modalBody) modalBody.innerHTML = html;
    caseStudyModal.classList.add('open');
    caseStudyModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCaseStudy() {
    if (!caseStudyModal) return;
    caseStudyModal.classList.remove('open');
    caseStudyModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (caseStudyCloseBtn) {
    caseStudyCloseBtn.addEventListener('click', closeCaseStudy);
  }
  if (caseStudyModal) {
    caseStudyModal.addEventListener('click', (e) => {
      if (e.target === caseStudyModal) closeCaseStudy();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && caseStudyModal && caseStudyModal.classList.contains('open')) {
      closeCaseStudy();
    }
  });

  // Attach case study modal click triggers
  document.querySelectorAll('[data-case-study]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = trigger.getAttribute('data-case-study');
      openCaseStudy(projId);
    });
  });

  // ==========================================================================
  // 9. INTERACTIVE SYSTEMS ARCHITECTURE (Visual Pipeline Explorer)
  // ==========================================================================
  function initArchitectureExplorer() {
    const nodes = data.architecture?.nodes || [];
    const container = document.getElementById('arch-nodes-container');
    const titleEl = document.getElementById('arch-detail-title');
    const badgeEl = document.getElementById('arch-detail-badge');
    const summaryEl = document.getElementById('arch-detail-summary');
    const controlsListEl = document.getElementById('arch-controls-list');

    if (!container || nodes.length === 0) return;

    function renderNodeDetail(node) {
      if (titleEl) titleEl.textContent = node.name;
      if (badgeEl) badgeEl.textContent = node.badge;
      if (summaryEl) summaryEl.textContent = node.summary;
      if (controlsListEl) {
        controlsListEl.innerHTML = (node.controls || [])
          .map(
            (ctrl) => `
          <div class="arch-control-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>${escapeHtml(ctrl)}</span>
          </div>
        `
          )
          .join('');
      }
    }

    container.innerHTML = nodes
      .map(
        (n, idx) => `
      <div class="arch-node-card ${idx === 0 ? 'active' : ''}" data-node-id="${escapeHtml(n.id)}" role="button" tabindex="0" aria-label="Explore ${escapeHtml(n.name)}">
        <div class="arch-node-kicker">${escapeHtml(n.badge)}</div>
        <div class="arch-node-name">${escapeHtml(n.name.split('. ')[1] || n.name)}</div>
      </div>
    `
      )
      .join('');

    renderNodeDetail(nodes[0]);

    container.querySelectorAll('.arch-node-card').forEach((card) => {
      const selectNode = () => {
        container.querySelectorAll('.arch-node-card').forEach((c) => c.classList.remove('active'));
        card.classList.add('active');
        const nodeId = card.getAttribute('data-node-id');
        const targetNode = nodes.find((n) => n.id === nodeId);
        if (targetNode) renderNodeDetail(targetNode);
      };

      card.addEventListener('click', selectNode);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectNode();
        }
      });
    });
  }

  // ==========================================================================
  // 10. CYBERSECURITY TECHNICAL LAB
  // ==========================================================================
  function initSecurityLab() {
    const labContainer = document.getElementById('security-lab-container');
    const tools = data.securityLab?.tools || [];
    if (!labContainer || tools.length === 0) return;

    labContainer.innerHTML = tools
      .map((tool) => {
        if (tool.id === 'header-audit') {
          return `
            <div class="lab-tool-card reveal-item">
              <div class="lab-tool-header">
                <h3 class="lab-tool-title">${escapeHtml(tool.title)}</h3>
                <span class="lab-tool-type">${escapeHtml(tool.type)}</span>
              </div>
              <p class="lab-tool-desc">${escapeHtml(tool.description)}</p>
              <div class="lab-table-container">
                <table class="lab-table">
                  <thead>
                    <tr>
                      <th>Header</th>
                      <th>Status</th>
                      <th>Defense Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${tool.headers
                      .map(
                        (h) => `
                      <tr>
                        <td style="font-family: monospace; color: var(--accent-light, #9b95ff);">${escapeHtml(h.name)}</td>
                        <td><span class="status-tag-green">${escapeHtml(h.status)}</span></td>
                        <td>${escapeHtml(h.role)}</td>
                      </tr>
                    `
                      )
                      .join('')}
                  </tbody>
                </table>
              </div>
            </div>
          `;
        } else if (tool.id === 'stride-matrix') {
          return `
            <div class="lab-tool-card reveal-item">
              <div class="lab-tool-header">
                <h3 class="lab-tool-title">${escapeHtml(tool.title)}</h3>
                <span class="lab-tool-type">${escapeHtml(tool.type)}</span>
              </div>
              <p class="lab-tool-desc">${escapeHtml(tool.description)}</p>
              <div class="lab-table-container">
                <table class="lab-table">
                  <thead>
                    <tr>
                      <th>STRIDE</th>
                      <th>Threat Vector</th>
                      <th>Security Countermeasure</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${tool.threats
                      .map(
                        (t) => `
                      <tr>
                        <td style="font-family: monospace; font-weight: 700; color: #ffffff;">[${escapeHtml(t.letter)}]</td>
                        <td style="color: #cbd5e1;">${escapeHtml(t.threat)}</td>
                        <td>${escapeHtml(t.countermeasure)}</td>
                      </tr>
                    `
                      )
                      .join('')}
                  </tbody>
                </table>
              </div>
            </div>
          `;
        } else if (tool.id === 'zero-trust') {
          return `
            <div class="lab-tool-card reveal-item">
              <div class="lab-tool-header">
                <h3 class="lab-tool-title">${escapeHtml(tool.title)}</h3>
                <span class="lab-tool-type">${escapeHtml(tool.type)}</span>
              </div>
              <p class="lab-tool-desc">${escapeHtml(tool.description)}</p>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                ${tool.principles
                  .map(
                    (p) => `
                  <div style="background: rgba(7, 8, 12, 0.75); border: 1px solid var(--border-subtle, rgba(255,255,255,0.08)); padding: 12px 16px; border-radius: 8px;">
                    <div style="font-family: monospace; font-size: 11.5px; color: var(--accent-light, #9b95ff); font-weight: 700; margin-bottom: 4px;">
                      ✓ ${escapeHtml(p.title)}
                    </div>
                    <div style="font-size: 13px; color: var(--text-muted, #7f8595); line-height: 1.45;">
                      ${escapeHtml(p.detail)}
                    </div>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>
          `;
        }
        return '';
      })
      .join('');
  }

  // ==========================================================================
  // 11. PUBLIC GITHUB INTEGRATION (Graceful Offline Fallback)
  // ==========================================================================
  async function initGithubShowcase() {
    const container = document.getElementById('github-showcase-container');
    if (!container) return;

    const fallback = data.githubFallback?.publicRepos || [];

    try {
      const response = await fetch('https://api.github.com/users/jatinsingh82/repos?sort=updated&per_page=4', {
        headers: { Accept: 'application/vnd.github.v3+json' },
        signal: AbortSignal.timeout(3000)
      });

      if (!response.ok) throw new Error('GitHub API response not ok');
      const repos = await response.json();
      if (!Array.isArray(repos) || repos.length === 0) throw new Error('No repos returned');

      renderRepos(
        repos.map((r) => ({
          name: r.name,
          description: r.description || 'Public engineering repository.',
          language: r.language || 'Codebase',
          url: r.html_url,
          stars: r.stargazers_count,
          forks: r.forks_count,
          topics: r.topics || []
        }))
      );
    } catch (err) {
      // Graceful offline fallback
      renderRepos(fallback);
    }

    function renderRepos(reposList) {
      container.innerHTML = reposList
        .map(
          (repo) => `
        <a href="${escapeHtml(repo.url)}" target="_blank" rel="noopener noreferrer" class="github-repo-card reveal-item" aria-label="View repository ${escapeHtml(repo.name)} on GitHub">
          <div class="repo-card-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            ${escapeHtml(repo.name)}
          </div>
          <div class="repo-card-desc">${escapeHtml(repo.description)}</div>
          <div class="repo-meta-row">
            <span style="display: inline-flex; align-items: center; gap: 6px;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent-light, #9b95ff);"></span>
              ${escapeHtml(repo.language)}
            </span>
            <span style="color: var(--accent-light, #9b95ff); font-weight: 600;">Explore →</span>
          </div>
        </a>
      `
        )
        .join('');
    }
  }

  // ==========================================================================
  // 12. COMMAND PALETTE (CMD+K / CTRL+K Developer Modal)
  // ==========================================================================
  const commandPalette = document.getElementById('command-palette');
  const commandInput = document.getElementById('command-input');
  const commandResultsList = document.getElementById('command-results');
  const cmdHintPill = document.getElementById('cmd-hint-pill');

  const COMMAND_ITEMS = [
    { label: 'Go to Home', section: 'hero', shortcut: 'H', category: 'Navigation' },
    { label: 'Go to Professional Overview', section: 'about', shortcut: 'A', category: 'Navigation' },
    { label: 'Go to Experience Timeline', section: 'experience', shortcut: 'E', category: 'Navigation' },
    { label: 'Go to Skills Matrix', section: 'skills', shortcut: 'S', category: 'Navigation' },
    { label: 'Go to Projects Showcase', section: 'projects', shortcut: 'P', category: 'Navigation' },
    { label: 'Go to Systems Architecture', section: 'architecture', shortcut: 'R', category: 'Navigation' },
    { label: 'Go to Cybersecurity Lab', section: 'security-lab', shortcut: 'L', category: 'Navigation' },
    { label: 'Go to Certifications', section: 'certifications', shortcut: 'C', category: 'Navigation' },
    { label: 'Go to Resume & Education', section: 'resume', shortcut: 'D', category: 'Navigation' },
    { label: 'Go to Contact', section: 'contact', shortcut: 'M', category: 'Navigation' },
    { label: 'Open GitHub Profile', action: () => window.open('https://github.com/jatinsingh82', '_blank'), shortcut: 'G', category: 'External Links' },
    { label: 'Open LinkedIn Profile', action: () => window.open('https://www.linkedin.com/in/jatinsingh82/', '_blank'), shortcut: 'I', category: 'External Links' },
    { label: 'Open Cyber Terminal Easter Egg', action: () => openTerminal(), shortcut: '~', category: 'Developer Tools' },
    { label: 'Toggle Light / Dark Theme', action: () => toggleTheme(), shortcut: 'T', category: 'Appearance' }
  ];

  function openCommandPalette() {
    if (!commandPalette) return;
    commandPalette.classList.add('open');
    commandPalette.setAttribute('aria-hidden', 'false');
    if (commandInput) {
      commandInput.value = '';
      commandInput.focus();
    }
    renderCommands('');
    document.body.style.overflow = 'hidden';
  }

  function closeCommandPalette() {
    if (!commandPalette) return;
    commandPalette.classList.remove('open');
    commandPalette.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function renderCommands(query = '') {
    if (!commandResultsList) return;
    const cleanQuery = query.toLowerCase().trim();
    const filtered = COMMAND_ITEMS.filter((item) =>
      item.label.toLowerCase().includes(cleanQuery) || item.category.toLowerCase().includes(cleanQuery)
    );

    if (filtered.length === 0) {
      commandResultsList.innerHTML = `
        <li style="padding: 20px; text-align: center; color: var(--text-muted, #7f8595); font-size: 13px;">
          No matching commands found.
        </li>
      `;
      return;
    }

    commandResultsList.innerHTML = filtered
      .map(
        (cmd, index) => `
      <li class="command-item ${index === 0 ? 'focused' : ''}" data-cmd-index="${index}" role="option" tabindex="0">
        <div class="command-item-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
          <span>${escapeHtml(cmd.label)}</span>
        </div>
        <span class="command-item-shortcut">${escapeHtml(cmd.shortcut)}</span>
      </li>
    `
      )
      .join('');

    commandResultsList.querySelectorAll('.command-item').forEach((li) => {
      li.addEventListener('click', () => {
        const idx = parseInt(li.getAttribute('data-cmd-index'), 10);
        executeCommand(filtered[idx]);
      });
    });
  }

  function executeCommand(cmd) {
    closeCommandPalette();
    if (cmd.section) {
      const target = document.getElementById(cmd.section);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (cmd.action) {
      cmd.action();
    }
  }

  if (commandInput) {
    commandInput.addEventListener('input', (e) => {
      renderCommands(e.target.value);
    });

    commandInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCommandPalette();
      } else if (e.key === 'Enter') {
        const focused = commandResultsList?.querySelector('.command-item.focused') || commandResultsList?.querySelector('.command-item');
        if (focused) {
          const idx = parseInt(focused.getAttribute('data-cmd-index'), 10);
          const cleanQuery = commandInput.value.toLowerCase().trim();
          const filtered = COMMAND_ITEMS.filter((item) =>
            item.label.toLowerCase().includes(cleanQuery) || item.category.toLowerCase().includes(cleanQuery)
          );
          if (filtered[idx]) executeCommand(filtered[idx]);
        }
      }
    });
  }

  if (commandPalette) {
    commandPalette.addEventListener('click', (e) => {
      if (e.target === commandPalette) closeCommandPalette();
    });
  }

  if (cmdHintPill) {
    cmdHintPill.addEventListener('click', openCommandPalette);
  }

  // Keyboard shortcut: CMD+K or CTRL+K
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (commandPalette?.classList.contains('open')) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    }
    // Terminal shortcut: Backtick `~` when not typing in an input
    if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      openTerminal();
    }
  });

  // ==========================================================================
  // 13. CYBER TERMINAL EASTER EGG (Factual Terminal Simulation)
  // ==========================================================================
  const terminalModal = document.getElementById('terminal-modal');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalCloseDot = document.getElementById('terminal-close-dot');

  function openTerminal() {
    if (!terminalModal) return;
    terminalModal.classList.add('open');
    terminalModal.setAttribute('aria-hidden', 'false');
    if (terminalInput) {
      terminalInput.value = '';
      terminalInput.focus();
    }
    if (terminalOutput && !terminalOutput.dataset.initialized) {
      terminalOutput.innerHTML = `[AUTHENTICATED TERMINAL SESSION]
Host: jatin-cyber-node
Identity: Jatin Singh (Cybersecurity Analyst)
Specialization: Cyber Strategy &amp; Transformation

Type 'help' for available diagnostic commands.`;
      terminalOutput.dataset.initialized = 'true';
    }
    document.body.style.overflow = 'hidden';
  }

  function closeTerminal() {
    if (!terminalModal) return;
    terminalModal.classList.remove('open');
    terminalModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (terminalCloseDot) {
    terminalCloseDot.addEventListener('click', closeTerminal);
  }

  if (terminalModal) {
    terminalModal.addEventListener('click', (e) => {
      if (e.target === terminalModal) closeTerminal();
    });
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        handleTerminalCommand(cmd);
        terminalInput.value = '';
      } else if (e.key === 'Escape') {
        closeTerminal();
      }
    });
  }

  function handleTerminalCommand(cmd) {
    if (!terminalOutput) return;

    let response = '';
    switch (cmd) {
      case 'help':
        response = `Available commands:
  whoami       - Display identity and specialization
  role         - Professional positioning and domains
  skills       - Factual cybersecurity competencies
  projects     - Featured technical and web initiatives
  education    - Degree and university verification
  contact      - Direct communication coordinates
  clear        - Clear terminal screen
  exit         - Close terminal session`;
        break;
      case 'whoami':
        response = `Jatin Singh — Cybersecurity Analyst
Specialization: Cyber Strategy & Transformation
Academic: B.Tech in Computer Science & Engineering (GLA University, Mathura)`;
        break;
      case 'role':
        response = `Cybersecurity Analyst | Cyber Strategy & Transformation
Key Focus: NIST CSF, ISO/IEC 27001, STRIDE Threat Modeling, Systems Architecture, and Enterprise Risk Governance.`;
        break;
      case 'skills':
        response = `Domains: Cybersecurity, Cloud, Networking, Programming, DevOps, Systems.
Highlights: NIST CSF, ISO 27001, IAM, Vulnerability Assessment, Java, C++, JavaScript, Linux, TLS.`;
        break;
      case 'projects':
        response = `Verified Projects:
  1. Rajdeep Enterprises Digital Platform (Commercial Web & Architecture)
  2. Weather Intelligence Telemetry (Asynchronous API Resilience)
  3. Privacy-Aware Geolocation Tracker (HTML5 Sensor Privacy)
  4. Algorithmic Problem Solving & Data Structures (Computational Rigor)`;
        break;
      case 'education':
        response = `Degree: B.Tech in Computer Science & Engineering
Institution: GLA University, Mathura, India
Core Focus: Systems Engineering, Network Security, and Information Security`;
        break;
      case 'contact':
        response = `Email: jatinthakur8273@gmail.com
LinkedIn: https://www.linkedin.com/in/jatinsingh82/
GitHub: https://github.com/jatinsingh82`;
        break;
      case 'clear':
        terminalOutput.innerHTML = '';
        return;
      case 'exit':
      case 'quit':
        closeTerminal();
        return;
      case '':
        return;
      default:
        response = `command not recognized: '${cmd}'. Type 'help' for verified commands.`;
    }

    terminalOutput.innerHTML += `\n\n<span style="color: var(--accent-light, #9b95ff);">jatin@cyber-terminal:~$</span> ${escapeHtml(cmd)}\n${response}`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // ==========================================================================
  // 14. SUBTLE CUSTOM CURSOR (Desktop Only)
  // ==========================================================================
  function initCustomCursor() {
    if (isReducedMotion || window.innerWidth < 1024 || 'ontouchstart' in window) return;

    const dot = document.querySelector('.custom-cursor-dot');
    const ring = document.querySelector('.custom-cursor-ring');
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }, { passive: true });

    function renderRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(renderRing);
    }
    renderRing();

    const hoverSelectors = 'a, button, .interactive-node, .skill-card, .cert-card, .arch-node-card, input, [role="button"]';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverSelectors)) {
        ring.classList.add('active');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverSelectors)) {
        ring.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // 15. CONTACT FORM HANDLING (Direct, Secure, No Fake Telemetry)
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !email || !message) {
        showFormStatus('Please complete all required fields.', 'error');
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Transmitting Message...';

      setTimeout(() => {
        const subject = encodeURIComponent(`Cybersecurity Inquiry from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

        showFormStatus('Opening your default email client to deliver message directly...', 'success');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        contactForm.reset();

        window.location.href = `mailto:jatinthakur8273@gmail.com?subject=${subject}&body=${body}`;
      }, 600);
    });
  }

  function showFormStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = `form-status ${type}`;
  }

  // ==========================================================================
  // 16. RESUME DOWNLOAD & MODAL
  // ==========================================================================
  const resumeBtn = document.getElementById('download-resume-btn');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const resumeModal = document.getElementById('resume-modal');
  const resumeModalClose = document.getElementById('resume-modal-close');

  function openResumeModal(e) {
    if (e) e.preventDefault();
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (resumeBtn) resumeBtn.addEventListener('click', openResumeModal);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResumeModal);

  if (resumeModalClose) {
    resumeModalClose.addEventListener('click', closeResumeModal);
  }
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResumeModal();
    });
  }

  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Helper: HTML sanitization
  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  window.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initExperienceExpansion();
    initArchitectureExplorer();
    initSecurityLab();
    initGithubShowcase();
    initCustomCursor();
  });
})();
