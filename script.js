/**
 * BENJAMIN ELIUDY MAUDY - SENIOR IT TECH EXPERT, FULL-STACK ENGINEER & UI/UX DESIGNER
 * World-Class Cyber Interactions: Particle Canvas, 3D Card Tilt, Dynamic Typing & Terminal CLI
 */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------------------
  // 1. Interactive Cyber Particle Canvas (Jaw-dropping Ambient Tech Visuals)
  // -------------------------------------------------------------------------
  const canvas = document.getElementById('cyber-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    const particleCount = Math.min(width > 768 ? 55 : 25, 60);
    const particles = [];
    const mouse = { x: null, y: null, maxDist: 120 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    }, { passive: true });

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw and connect particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Particle circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - dist / 115) * 0.16})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // React to mouse proximity
        if (mouse.x !== null && mouse.y !== null) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < mouse.maxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - mDist / mouse.maxDist) * 0.28})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // -------------------------------------------------------------------------
  // 2. Dynamic Typing Animation for Hero Subtitle
  // -------------------------------------------------------------------------
  const typingRoleEl = document.getElementById('typing-role');
  if (typingRoleEl) {
    const roles = [
      "Full-Stack Software Engineer",
      "UI/UX & Graphic Designer",
      "MikroTik & Hardware Network Specialist",
      "AI Systems & LLM Integrator",
      "Cloud Infrastructure Architect"
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function typeLoop() {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        charIdx--;
        typeSpeed = 40;
      } else {
        charIdx++;
        typeSpeed = 85;
      }

      typingRoleEl.textContent = currentRole.substring(0, charIdx);

      if (!isDeleting && charIdx === currentRole.length) {
        typeSpeed = 2200; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 400; // Pause before next word
      }

      setTimeout(typeLoop, typeSpeed);
    }
    setTimeout(typeLoop, 600);
  }

  // -------------------------------------------------------------------------
  // 3. Scroll-Driven Reveal Animations (Smooth Stagger Transitions)
  // -------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, idx * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));

  // -------------------------------------------------------------------------
  // 4. Interactive 3D Card Tilt on Mouse Move
  // -------------------------------------------------------------------------
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
  });

  // -------------------------------------------------------------------------
  // 5. Audio Feedback Synthesizer (Web Audio API)
  // -------------------------------------------------------------------------
  let audioEnabled = false;
  let audioCtx = null;

  const initAudio = () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  };

  const playBeep = (freq = 800, type = 'sine', duration = 0.04) => {
    if (!audioEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  };

  const soundToggle = document.getElementById('sound-toggle');
  const soundIcon = document.getElementById('sound-icon');
  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      if (audioEnabled) {
        initAudio();
        soundIcon.className = 'fa-solid fa-volume-high';
        soundToggle.style.color = 'var(--accent-text)';
        playBeep(900, 'triangle', 0.08);
      } else {
        soundIcon.className = 'fa-solid fa-volume-xmark';
        soundToggle.style.color = '';
      }
    });
  }

  // -------------------------------------------------------------------------
  // 6. Theme Accent Picker
  // -------------------------------------------------------------------------
  const themeDots = document.querySelectorAll('.color-dot');
  const savedTheme = localStorage.getItem('tech_theme') || 'cyan';
  document.body.setAttribute('data-theme', savedTheme);

  themeDots.forEach(dot => {
    if (dot.dataset.color === savedTheme) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }

    dot.addEventListener('click', () => {
      const color = dot.dataset.color;
      document.body.setAttribute('data-theme', color);
      localStorage.setItem('tech_theme', color);
      themeDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      playBeep(1200, 'sine', 0.05);
    });
  });

  // -------------------------------------------------------------------------
  // 7. Mobile Navigation Menu
  // -------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      playBeep(600, 'sine', 0.03);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        playBeep(750, 'sine', 0.02);
      });
    });
  }

  // Active section indicator in navbar
  const sections = document.querySelectorAll('section[id]');
  const handleScrollSpy = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNav.classList.add('active');
        } else {
          targetNav.classList.remove('active');
        }
      }
    });
  };
  window.addEventListener('scroll', handleScrollSpy, { passive: true });

  // -------------------------------------------------------------------------
  // 8. Hero Stats Counter Animation
  // -------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-num[data-target]');
  let hasAnimated = false;

  const animateStats = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      let count = 0;
      const duration = 1200;
      const stepTime = 30;
      const increment = Math.ceil(target / (duration / stepTime));

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          stat.textContent = `${target}+`;
          clearInterval(timer);
        } else {
          stat.textContent = `${count}+`;
        }
      }, stepTime);
    });
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateStats();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.hero-quick-stats');
  if (statsSection) statsObserver.observe(statsSection);

  // -------------------------------------------------------------------------
  // 9. Interactive SysAdmin Terminal CLI (Pure English & Tailored Data)
  // -------------------------------------------------------------------------
  const terminalOutput = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input');
  const btnTermClear = document.getElementById('btn-term-clear');
  const commandChips = document.querySelectorAll('.chip-cmd');
  const cmdHistory = [];
  let historyIndex = -1;

  const terminalResponses = {
    help: `
<span class="text-accent">Available System Commands:</span>
  <span class="cmd-highlight">whoami</span>          Full credentials of Benjamin Eliudy Maudy
  <span class="cmd-highlight">skills</span>          5 Core Disciplines (UI/UX, Software, Networks, AI, IT)
  <span class="cmd-highlight">design</span>          UI/UX Prototyping, Figma &amp; Brand Identity
  <span class="cmd-highlight">mikrotik</span>        MikroTik RouterOS, RADIUS &amp; WiFi Hotspots
  <span class="cmd-highlight">ai</span>              OpenAI &amp; Google Gemini API integrations
  <span class="cmd-highlight">projects</span>        6 Featured Enterprise Field Implementations
  <span class="cmd-highlight">contact</span>         Direct phone &amp; WhatsApp communication
  <span class="cmd-highlight">clear</span>           Purge terminal screen buffer
    `,

    whoami: `
<span class="text-success">[ENGINEER CREDENTIALS / ROOT ACCESS]</span>
Name:            Benjamin Eliudy Maudy
Title:           Senior IT Tech Expert • Full-Stack Engineer • UI/UX Designer
Experience:      10+ Continuous Years in Enterprise IT, Software &amp; Networks
Primary Phone:   +255 745 517 500
Secondary Phone: +255 678 157 500
WhatsApp:        https://wa.me/255745517500
Markets:         African Enterprises &amp; International Remote Contracts
Status:          Available for New Technical Engagements &amp; Consulting
    `,

    design: `
<span class="text-accent">[UI/UX &amp; GRAPHIC DESIGN ARSENAL]</span>
Core Tools:      Figma, Adobe XD, Adobe Photoshop, Adobe Illustrator
Capabilities:    UX User Research, Wireframing, High-Fidelity Prototyping
Brand Identity:  Modern Vector Logo Design, Style Guides, Corporate Identity
Web Integration: Design Systems mapped seamlessly to React/Next.js &amp; Tailwind CSS
    `,

    skills: `
<span class="text-accent">>>> BENJAMIN MAUDY - 5 CORE DISCIPLINES:</span>
1. UI/UX &amp; Graphic Design:
   - Figma, Adobe XD, Photoshop, Illustrator, Brand Identity, Responsive UI
2. Software Engineering:
   - Full-Stack: React.js, Next.js, TypeScript, Node.js, Python
   - Databases: SQL (PostgreSQL, MySQL) &amp; NoSQL (MongoDB)
   - DevOps: Git/GitHub, CI/CD, Vercel, Railway, Cloud Servers, REST/GraphQL
3. Hardware &amp; Networking:
   - MikroTik routers, switches, bandwidth QoS, Captive Portals &amp; RADIUS WiFi
   - Hikvision Access Control (Biometric/RFID), IP CCTV cameras (NVR/DVR)
   - Conventional Fire Alarm panels, LAN/WAN structured cabling
4. AI Engineering:
   - OpenAI (GPT-4o) &amp; Google Gemini API integrations
   - Advanced Prompt Engineering for LLMs, automated data processing
5. Core IT &amp; System Architecture:
   - Hardware-to-Software integration, Cloud VPS, Cybersecurity (Auth/RBAC)
    `,

    mikrotik: `
<span class="text-success">[MIKROTIK &amp; ENTERPRISE NETWORKING DEPLOYMENTS]</span>
RouterOS:        Multi-VLAN Routing, Bandwidth QoS Shaping, Load Balancing
Hotspots:        Captive Portals with RADIUS Server user authentication &amp; billing
Security:        Hardware Firewall Rules, NAT, Port Forwarding, WireGuard VPNs
Hardware:        MikroTik CRS series, hEX, Cloud Core Routers (CCR), UniFi APs
    `,

    ai: `
<span class="text-accent">[AI ENGINEERING &amp; MODERN APIS]</span>
APIs:            OpenAI (GPT-4o), Google Gemini 1.5/2.0 API Integrations
Workflows:       Automated Document Processing, Intelligent Chatbots, Analytics
Prompts:         Engineered System Prompts with Few-Shot &amp; Structured JSON Outputs
Frameworks:      Next.js AI SDK, Python LangChain/LlamaIndex Integration
    `,

    projects: `
<span class="text-success">[FEATURED ENGINEERING SOLUTIONS - 6 CORE IMPLEMENTATIONS]</span>
1. UI/UX &amp; Web Platform: Next.js + TypeScript + Figma + AI Insights
2. Hardware &amp; Networking: MikroTik RouterOS + RADIUS Campus Hotspots + QoS
3. Physical Security: Hikvision Biometric Access Control + CCTV + Fire Alarms
4. Branding &amp; Visuals: Brand Identity, Photoshop, Illustrator &amp; Design Systems
5. IT Tech Support: Tier-3 Systems Diagnostics, Server Maintenance &amp; Disaster Recovery
6. AI &amp; Automation: Autonomous AI Agents, OpenAI/Gemini Pipelines &amp; LLM Workflows
    `,

    contact: `
<span class="text-accent">Direct Communication Coordinates:</span>
Primary Phone:   <a href="tel:+255745517500" class="text-accent">+255 745 517 500</a>
Secondary Phone: <a href="tel:+255678157500" class="text-accent">+255 678 157 500</a>
WhatsApp:        <a href="https://wa.me/255745517500" target="_blank" rel="noopener noreferrer" class="text-whatsapp">https://wa.me/255745517500</a>
Email:           <a href="mailto:benjamin.maudy@tech-expert.com" class="text-accent">benjamin.maudy@tech-expert.com</a>
LinkedIn:        linkedin.com/in/benjamin-eliudy-maudy
GitHub:          github.com/benjamin-maudy
Location:        Tanzania, East Africa &amp; Worldwide Remote
    `
  };

  const appendTermLine = (html, isCommand = false) => {
    const line = document.createElement('div');
    line.className = 'term-line';
    if (isCommand) {
      line.innerHTML = `<span class="text-success">benjamin@maudy</span>:<span class="text-accent">~</span>$ <b>${html}</b>`;
    } else {
      line.innerHTML = html;
    }
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  };

  const handleCommand = (rawInput) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    cmdHistory.push(trimmed);
    historyIndex = cmdHistory.length;

    appendTermLine(trimmed, true);
    playBeep(850, 'sine', 0.04);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();

    if (cmd === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    if (terminalResponses[cmd]) {
      const response = typeof terminalResponses[cmd] === 'function' ? terminalResponses[cmd]() : terminalResponses[cmd];
      appendTermLine(response);
    } else {
      appendTermLine(`<span class="text-danger">bash: ${cmd}: command not found.</span> Type <span class="cmd-highlight">help</span> to view valid commands.`);
    }
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const value = terminalInput.value;
        terminalInput.value = '';
        handleCommand(value);
      } else if (e.key === 'ArrowUp') {
        if (cmdHistory.length > 0 && historyIndex > 0) {
          historyIndex--;
          terminalInput.value = cmdHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
          historyIndex++;
          terminalInput.value = cmdHistory[historyIndex];
        } else {
          historyIndex = cmdHistory.length;
          terminalInput.value = '';
        }
      } else {
        playBeep(700, 'triangle', 0.015);
      }
    });
  }

  if (btnTermClear) {
    btnTermClear.addEventListener('click', () => {
      terminalOutput.innerHTML = '';
      playBeep(500, 'sine', 0.03);
    });
  }

  commandChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-command');
      handleCommand(cmd);
      if (terminalInput) terminalInput.focus();
    });
  });

  // -------------------------------------------------------------------------
  // 10. Skills Disciplines Filter
  // -------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      playBeep(850, 'sine', 0.03);

      const filter = btn.dataset.filter;
      skillCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 11. Modals (Resume / CV)
  // -------------------------------------------------------------------------
  const cvModal = document.getElementById('cv-modal');
  const btnViewCv = document.getElementById('btn-view-cv');
  const btnCloseCv = document.getElementById('btn-close-cv');
  const btnModalCloseAction = document.getElementById('btn-modal-close-action');
  const cvBackdrop = document.getElementById('cv-backdrop');
  const btnPrintCv = document.getElementById('btn-print-cv');

  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    playBeep(950, 'sine', 0.04);
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (btnViewCv) btnViewCv.addEventListener('click', () => openModal(cvModal));
  if (btnCloseCv) btnCloseCv.addEventListener('click', () => closeModal(cvModal));
  if (btnModalCloseAction) btnModalCloseAction.addEventListener('click', () => closeModal(cvModal));
  if (cvBackdrop) cvBackdrop.addEventListener('click', () => closeModal(cvModal));

  if (btnPrintCv) {
    btnPrintCv.addEventListener('click', () => {
      window.print();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal(cvModal);
  });

  // -------------------------------------------------------------------------
  // 12. Contact Form Submission & Validation
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const btnSubmitForm = document.getElementById('btn-submit-form');
  const formToast = document.getElementById('form-toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const msgInput = document.getElementById('contact-message');

      let isValid = true;

      if (!nameInput.value.trim()) {
        nameInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        nameInput.closest('.form-group').classList.remove('has-error');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        emailInput.closest('.form-group').classList.remove('has-error');
      }

      if (!msgInput.value.trim()) {
        msgInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        msgInput.closest('.form-group').classList.remove('has-error');
      }

      if (!isValid) {
        playBeep(400, 'sawtooth', 0.1);
        return;
      }

      btnSubmitForm.disabled = true;
      btnSubmitForm.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Transmitting...`;
      playBeep(900, 'sine', 0.05);

      setTimeout(() => {
        btnSubmitForm.disabled = false;
        btnSubmitForm.innerHTML = `<i class="fa-solid fa-check"></i> Transmitted`;
        formToast.classList.add('show');
        playBeep(1200, 'sine', 0.1);

        contactForm.reset();

        setTimeout(() => {
          formToast.classList.remove('show');
          btnSubmitForm.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span>Transmit Message</span>`;
        }, 5000);
      }, 1000);
    });
  }

  // -------------------------------------------------------------------------
  // 13. Back to Top Button
  // -------------------------------------------------------------------------
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      playBeep(900, 'sine', 0.04);
    });
  }
});
