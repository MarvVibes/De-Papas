// main.js - Modern Construction Website Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initCadGridTelemetry();
    setupSmoothScrolling();
    initAboutTabs();
    initLiveFeed();
    initProcessConsole();
    initProjectSliders();
    initProjectScrollAnimations();
    initTestimonialsConsole();
    initFaqAccordion();
    initContactPortal();
    initFooterNewsletter();
    printWelcomeConsole();
});

/**
 * Theme Toggler Setup
 */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    // Load saved preference - force light theme by default to respect white background setting
    let savedTheme = localStorage.getItem('depapas-theme');
    if (savedTheme !== 'light') {
        savedTheme = 'light';
        localStorage.setItem('depapas-theme', 'light');
    }

    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
    } else {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    }

    themeBtn.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('depapas-theme', 'dark');
            showThemeToast('Switched to Dark Sunset Mode');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('depapas-theme', 'light');
            showThemeToast('Switched to Light Day Mode');
        }
    });
}

/**
 * Telemetry Grid numbers simulation (CAD-style overlay coordinates animation)
 */
function initCadGridTelemetry() {
    const textElements = document.querySelectorAll('.cad-grid-svg text');
    if (textElements.length === 0) return;

    setInterval(() => {
        textElements.forEach(textEl => {
            const originalVal = textEl.textContent;
            const originalNum = parseFloat(originalVal);
            if (!isNaN(originalNum)) {
                // Add a very small random fluctuation to simulate ongoing precision measurement
                const fluctuation = (Math.random() - 0.5) * 0.04;
                const newNum = (originalNum + fluctuation).toFixed(1);
                const suffix = originalVal.replace(/[0-9.]/g, '').trim();
                textEl.textContent = `${newNum} ${suffix}`;
            }
        });
    }, 4000);
}

/**
 * Smooth Scrolling for Anchor Links
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Toast notification for theme switch feedback (custom styled toast)
 */
function showThemeToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.theme-toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'theme-toast';
    toast.textContent = message;

    // Direct styling for self-containment
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        background: 'rgba(20, 21, 26, 0.9)',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '12px 24px',
        borderRadius: '6px',
        fontFamily: "'Outfit', sans-serif",
        fontSize: '0.8rem',
        fontWeight: '600',
        letterSpacing: '0.5px',
        zIndex: '1000',
        pointerEvents: 'none',
        opacity: '0',
        transform: 'translateY(10px)',
        transition: 'all 0.3s ease',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(8px)'
    });

    // Handle light theme styling override
    if (document.body.classList.contains('light-theme')) {
        toast.style.background = 'rgba(255, 255, 255, 0.95)';
        toast.style.color = '#121316';
        toast.style.border = '1px solid rgba(18, 19, 22, 0.1)';
        toast.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }

    document.body.appendChild(toast);

    // Fade in
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });

    // Fade out and remove
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

/**
 * Signature Console Welcome
 */
function printWelcomeConsole() {
    console.log(
        '%c DE PAPAS GLOBAL VENTURES %c Construction & Logistics Solutions v1.0.0 ',
        'background: #d89635; color: #121316; font-size: 12px; font-weight: bold; padding: 4px; border-radius: 3px 0 0 3px;',
        'background: #080d16; color: #ffffff; font-size: 12px; padding: 4px; border-radius: 0 3px 3px 0;'
    );
    console.log('%cIntelligent Telemetry Grid Activated.', 'color: #888888; font-style: italic;');
}

/**
 * About Section Interactive Tabs Setup
 */
const ABOUT_STATES = {
    planning: {
        phase: 'Phase 3 - Structural Work',
        percentage: '68%',
        progressWidth: '68%',
        statusLabel: 'On Track',
        vehicles: '24',
        res1: 'Machinery',
        resVal1: '36',
        res2: 'Labour Force',
        resVal2: '128',
        res3: 'Materials',
        resVal3: '250+',
        routeOffset: '0'
    },
    logistics: {
        phase: 'Fleet Management',
        percentage: '85%',
        progressWidth: '85%',
        statusLabel: 'Optimal',
        vehicles: '42',
        res1: 'Active Fleet',
        resVal1: '18 Trucks',
        res2: 'Dispatchers',
        resVal2: '6 Team',
        res3: 'Depot Points',
        resVal3: '3 Hubs',
        routeOffset: '35'
    },
    allocation: {
        phase: 'Workforce Deployment',
        percentage: '92%',
        progressWidth: '92%',
        statusLabel: 'Efficient',
        vehicles: '14',
        res1: 'Site Managers',
        resVal1: '8 PMs',
        res2: 'Engineers',
        resVal2: '14 Lead',
        res3: 'Contractors',
        resVal3: '110 Crew',
        routeOffset: '75'
    },
    progress: {
        phase: 'Phase 4 - Internal Works',
        percentage: '45%',
        progressWidth: '45%',
        statusLabel: 'Ahead',
        vehicles: '12',
        res1: 'Cranes',
        resVal1: '4 Active',
        res2: 'Mixers',
        resVal2: '8 Units',
        res3: 'Steel Frames',
        resVal3: '98% Done',
        routeOffset: '55'
    },
    quality: {
        phase: 'QA Materials Audit',
        percentage: '100%',
        progressWidth: '100%',
        statusLabel: 'Certified',
        vehicles: '8',
        res1: 'QA Inspectors',
        resVal1: '5 Officers',
        res2: 'Testing Labs',
        resVal2: '2 Labs',
        res3: 'Certifications',
        resVal3: '12 Passed',
        routeOffset: '15'
    },
    delivery: {
        phase: 'Client Handover Stage',
        percentage: '98%',
        progressWidth: '98%',
        statusLabel: 'On Schedule',
        vehicles: '30',
        res1: 'Completed sites',
        resVal1: '50+ builds',
        res2: 'Satisfied Clients',
        resVal2: '100%',
        res3: 'Slippage Days',
        resVal3: '0 Days',
        routeOffset: '95'
    }
};

function initAboutTabs() {
    const opsItems = document.querySelectorAll('.ops-item');
    if (opsItems.length === 0) return;

    const statePhase = document.getElementById('state-phase');
    const statePercentage = document.getElementById('state-percentage');
    const stateProgressFill = document.getElementById('state-progress-fill');
    const stateStatusLabel = document.getElementById('state-status-label');
    const stateVehiclesCount = document.getElementById('state-vehicles-count');
    
    const resLabel1 = document.getElementById('res-label-1');
    const resVal1 = document.getElementById('res-val-1');
    const resLabel2 = document.getElementById('res-label-2');
    const resVal2 = document.getElementById('res-val-2');
    const resLabel3 = document.getElementById('res-label-3');
    const resVal3 = document.getElementById('res-val-3');
    
    const activeRouteLine = document.getElementById('active-route-line');

    let autoplayTimer = null;
    let currentIndex = 0;
    const intervalTime = 2500; // Auto advance every 2.5 seconds
    let isHovered = false;

    function activateTab(index) {
        const item = opsItems[index];
        if (!item) return;

        opsItems.forEach(el => el.classList.remove('active'));
        item.classList.add('active');

        const stateKey = item.getAttribute('data-op');
        const data = ABOUT_STATES[stateKey];
        if (!data) return;

        // Fade transition text content updates
        updateElementText(statePhase, data.phase);
        updateElementText(statePercentage, data.percentage);
        updateElementText(stateStatusLabel, data.statusLabel);
        updateElementText(stateVehiclesCount, data.vehicles);

        updateElementText(resLabel1, data.res1);
        updateElementText(resVal1, data.resVal1);
        updateElementText(resLabel2, data.res2);
        updateElementText(resVal2, data.resVal2);
        updateElementText(resLabel3, data.res3);
        updateElementText(resVal3, data.resVal3);

        // Animate progress fill width
        if (stateProgressFill) {
            stateProgressFill.style.width = data.progressWidth;
        }

        // Animate route map line path tracing
        if (activeRouteLine) {
            activeRouteLine.setAttribute('stroke-dashoffset', data.routeOffset);
        }

        currentIndex = index;
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => {
            if (!isHovered) {
                let nextIndex = (currentIndex + 1) % opsItems.length;
                activateTab(nextIndex);
            }
        }, intervalTime);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    opsItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (item.classList.contains('active')) {
                startAutoplay(); // Reset timer
                return;
            }
            activateTab(index);
            startAutoplay(); // Reset timer
        });
    });

    // Pause auto-advancing walkthrough when user is interacting with dashboard mockup
    const mockupFrame = document.querySelector('.mockup-frame');
    if (mockupFrame) {
        mockupFrame.addEventListener('mouseenter', () => {
            isHovered = true;
        });
        mockupFrame.addEventListener('mouseleave', () => {
            isHovered = false;
            // Instantly reset timer duration on leave
            startAutoplay();
        });
    }

    // Start walkthrough on page load
    startAutoplay();
}

/**
 * Live Project Feed - auto-cycling status messages
 */
function initLiveFeed() {
    const feedText = document.getElementById('live-feed-text');
    if (!feedText) return;

    const feedMessages = [
        'Site A - Foundation Work In Progress',
        'Site B - Structural Steel Erection Complete',
        'Site C - Electrical Conduit Installation',
        'Site A - Concrete Pouring Phase 2 Active',
        'Site D - Final QA Inspection Scheduled',
        'Fleet - 18 Trucks Dispatched to Site B',
        'Site C - Roofing Material Delivery Confirmed',
    ];

    let feedIndex = 0;

    setInterval(() => {
        feedIndex = (feedIndex + 1) % feedMessages.length;
        feedText.style.transition = 'opacity 0.3s ease';
        feedText.style.opacity = '0';
        setTimeout(() => {
            feedText.textContent = feedMessages[feedIndex];
            feedText.style.opacity = '1';
        }, 300);
    }, 4000);
}

function updateElementText(element, text) {
    if (!element) return;
    element.style.transition = 'opacity 0.15s ease';
    element.style.opacity = '0';
    setTimeout(() => {
        element.textContent = text;
        element.style.opacity = '1';
    }, 150);
}

/**
 * Process Console - auto-advancing interactive operations screen
 */
const PROCESS_PHASES = {
    1: {
        coords: 'LAT: 06.4524° N | LNG: 003.3792° E',
        elev: '24.5 m',
        crew: '12 Active',
        signal: '98% SECURE',
        diagnostics: [
            '> INITIALIZING CONSOLE MONITOR STATUS... ONLINE',
            '> STAGE 01: CONSULTATION PROCESS SELECTED',
            '> RETRIEVING SITE A SURVEY REPORT AND SCOPE BLUEPRINTS'
        ]
    },
    2: {
        coords: 'LAT: 06.4524° N | LNG: 003.3792° E',
        elev: 'N/A (HQ)',
        crew: '8 Logistics',
        signal: '95% SECURE',
        diagnostics: [
            '> STAGE 02: PLANNING & LOGISTICS STAGE INITIATED',
            '> COMPILING CRITICAL PATH SCHEDULE AND PROCUREMENT CHECKLIST',
            '> FLEET DISPATCH OPTIMIZED... LINKING HUD TO TRAFFIC TELEMETRY'
        ]
    },
    3: {
        coords: 'LAT: 06.4589° N | LNG: 003.3850° E',
        elev: '22.1 m',
        crew: '26 Earthworks',
        signal: '92% ESTABLISHED',
        diagnostics: [
            '> STAGE 03: SITE PREPARATION TELEMETRY ACTIVE',
            '> MOBILIZING SURVEY GRID AND HEAVY BULLDOZER ROUTING',
            '> SITE GRADIENTS CALIBRATING... GROUND STABILIZATION LOGGED'
        ]
    },
    4: {
        coords: 'LAT: 06.4595° N | LNG: 003.3862° E',
        elev: '45.8 m',
        crew: '74 Erectors',
        signal: '99% OPTIMAL',
        diagnostics: [
            '> STAGE 04: CONSTRUCTION EXECUTION METRICS RENDERING',
            '> CONCRETE INTEGRITY SENSORS ACTIVE... CURE RATE ON TRACK',
            '> TOWER CRANE TELEMETRY LOGGING: LOAD SPEED NORMAL'
        ]
    },
    5: {
        coords: 'LAT: 06.4524° N | LNG: 003.3792° E',
        elev: '28.0 m',
        crew: '14 QA Inspectors',
        signal: '100% SECURE',
        diagnostics: [
            '> STAGE 05: COMPLETION & QUALITY AUDIT IN PROGRESS',
            '> VERIFYING SITE COMPLIANCE PROTOCOLS AGAINST HANDOVER PATH',
            '> PROJECT INSPECTED... STATUS: SEAMLESS TRANSFER VERIFIED'
        ]
    }
};

function initProcessConsole() {
    const cards = document.querySelectorAll('.process-card');
    if (cards.length === 0) return;

    const playPauseBtn = document.getElementById('cycle-play-pause-btn');
    const playIcon = playPauseBtn ? playPauseBtn.querySelector('.play-icon') : null;
    const pauseIcon = playPauseBtn ? playPauseBtn.querySelector('.pause-icon') : null;
    const controlText = playPauseBtn ? playPauseBtn.querySelector('.control-text') : null;
    const monitorStatusText = document.getElementById('monitor-status-text');
    const monitorFrame = document.getElementById('process-monitor');

    let currentStep = 1;
    let progress = 0;
    let progressInterval = null;
    const stepDuration = 6000; // 6 seconds per step
    const updateTick = 50; // Update progress bar every 50ms
    let isConsolePaused = false;
    let isMouseHovered = false;

    function startProgress() {
        clearInterval(progressInterval);
        const progressBar = document.getElementById(`p-bar-${currentStep}`);
        if (!progressBar) return;

        progressInterval = setInterval(() => {
            if (isConsolePaused || isMouseHovered) return;
            progress += (updateTick / stepDuration) * 100;
            if (progress >= 100) {
                progress = 0;
                progressBar.style.width = '0%';
                const nextStep = (currentStep % 5) + 1;
                activateStep(nextStep);
            } else {
                progressBar.style.width = `${progress}%`;
            }
        }, updateTick);
    }

    function activateStep(stepIndex) {
        // Reset current progress
        const oldProgressBar = document.getElementById(`p-bar-${currentStep}`);
        if (oldProgressBar) oldProgressBar.style.width = '0%';
        progress = 0;

        currentStep = stepIndex;

        // Update cards layout and status badges
        cards.forEach(card => {
            const stepNum = parseInt(card.getAttribute('data-step'));
            card.classList.remove('active');
            const statusTag = card.querySelector('.process-status-tag');
            if (!statusTag) return;

            if (stepNum === currentStep) {
                card.classList.add('active');
                statusTag.textContent = 'ACTIVE';
                statusTag.className = 'process-status-tag active';
            } else if (stepNum < currentStep) {
                statusTag.textContent = 'COMPLETED';
                statusTag.className = 'process-status-tag completed';
            } else {
                statusTag.textContent = 'QUEUED';
                statusTag.className = 'process-status-tag';
            }
        });

        // Update monitor display slides
        const slides = document.querySelectorAll('.monitor-slide');
        slides.forEach(slide => {
            const slideNum = parseInt(slide.getAttribute('data-slide'));
            if (slideNum === currentStep) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update HUD text values
        const data = PROCESS_PHASES[currentStep];
        if (data) {
            const coordsEl = document.getElementById('monitor-coords');
            const elevEl = document.getElementById('hud-elev-val');
            const crewEl = document.getElementById('hud-crew-val');
            const signalEl = document.getElementById('hud-signal-val');

            if (coordsEl) coordsEl.textContent = data.coords;
            if (elevEl) elevEl.textContent = data.elev;
            if (crewEl) crewEl.textContent = data.crew;
            if (signalEl) signalEl.textContent = data.signal;

            updateDiagnosticsLines(data.diagnostics);
        }

        // Restart timer
        startProgress();
    }

    function updateDiagnosticsLines(lines) {
        const lineElements = [
            document.getElementById('diag-line-1'),
            document.getElementById('diag-line-2'),
            document.getElementById('diag-line-3')
        ];

        if (window.diagTimeouts) {
            window.diagTimeouts.forEach(t => clearTimeout(t));
        }
        window.diagTimeouts = [];

        lineElements.forEach((el, index) => {
            if (!el) return;
            el.textContent = '';
            el.classList.remove('highlight');

            const fullText = lines[index] || '';
            let charIndex = 0;

            function typeChar() {
                if (charIndex < fullText.length) {
                    el.textContent += fullText.charAt(charIndex);
                    charIndex++;
                    const t = setTimeout(typeChar, 12);
                    window.diagTimeouts.push(t);
                } else {
                    if (index === 2) {
                        el.classList.add('highlight');
                    }
                }
            }

            const startTimeout = setTimeout(typeChar, index * 300);
            window.diagTimeouts.push(startTimeout);
        });
    }

    function updatePausePlayUI() {
        if (isConsolePaused) {
            if (playIcon) playIcon.style.display = 'block';
            if (pauseIcon) pauseIcon.style.display = 'none';
            if (controlText) controlText.textContent = 'RESUME WALKTHROUGH';
            if (monitorStatusText) monitorStatusText.textContent = 'CYCLE PAUSED';
        } else {
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
            if (controlText) controlText.textContent = 'PAUSE WALKTHROUGH';
            if (monitorStatusText) monitorStatusText.textContent = 'CYCLE ACTIVE';
        }
    }

    // Play/Pause Click Handler
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isConsolePaused = !isConsolePaused;
            updatePausePlayUI();
            startProgress();
        });
    }

    // Click cards to select process manually
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const stepNum = parseInt(card.getAttribute('data-step'));
            if (stepNum === currentStep) return;

            // When user clicks manually, pause cycle to let them review
            isConsolePaused = true;
            updatePausePlayUI();
            activateStep(stepNum);
        });
    });

    // Pause auto-advancing when hovering the display screen monitor
    if (monitorFrame) {
        monitorFrame.addEventListener('mouseenter', () => {
            isMouseHovered = true;
        });
        monitorFrame.addEventListener('mouseleave', () => {
            isMouseHovered = false;
        });
    }

    // Initialize diagnostics bar for first step
    const initData = PROCESS_PHASES[1];
    if (initData) {
        updateDiagnosticsLines(initData.diagnostics);
    }

    // Start cycle
    startProgress();
}

/**
 * Initialize Before/After transition sliders for Featured Projects
 */
function initProjectSliders() {
    const sliders = document.querySelectorAll('.before-after-slider');
    
    sliders.forEach(slider => {
        const afterLayer = slider.querySelector('.layer-after');
        const afterImg = afterLayer ? afterLayer.querySelector('.slider-img') : null;
        const divider = slider.querySelector('.slider-divider');
        const projId = slider.getAttribute('data-project');
        
        if (!afterLayer || !divider) return;
        
        let isDragging = false;
        
        // Dynamic image locking to prevent squishing
        function updateImgWidth() {
            if (afterImg) {
                const rect = slider.getBoundingClientRect();
                afterImg.style.width = `${rect.width}px`;
            }
        }
        
        // Initial call and event listeners
        updateImgWidth();
        window.addEventListener('resize', updateImgWidth);
        // Fallback for dynamic container styling updates
        setTimeout(updateImgWidth, 300);
        setTimeout(updateImgWidth, 1000);
        
        function setPosition(x) {
            const rect = slider.getBoundingClientRect();
            let position = ((x - rect.left) / rect.width) * 100;
            if (position < 0) position = 0;
            if (position > 100) position = 100;
            
            afterLayer.style.width = `${position}%`;
            divider.style.left = `${position}%`;
            
            // Interpolate HUD values based on slider percentage
            updateProjectHud(projId, position);
        }
        
        // Event Listeners for dragging/movement
        slider.addEventListener('mousedown', (e) => {
            isDragging = true;
            setPosition(e.clientX);
        });
        
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            setPosition(e.clientX);
        });
        
        window.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        // Hover tracking (desktop enhancement)
        slider.addEventListener('mousemove', (e) => {
            if (isDragging) return;
            setPosition(e.clientX);
        });
        
        // Touch events
        slider.addEventListener('touchstart', (e) => {
            isDragging = true;
            if (e.touches && e.touches[0]) {
                setPosition(e.touches[0].clientX);
            }
        }, { passive: true });
        
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            if (e.touches && e.touches[0]) {
                setPosition(e.touches[0].clientX);
            }
        }, { passive: true });
        
        window.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        // Set default slider position to 50%
        afterLayer.style.width = '50%';
        divider.style.left = '50%';
        updateProjectHud(projId, 50);
    });
}

/**
 * Update Project HUD elements dynamically based on slider position
 */
function updateProjectHud(projId, position) {
    if (projId === '1') {
        const statusEl = document.getElementById('hud-p1-status');
        const progressTextEl = document.getElementById('hud-p1-progress');
        const progressBarEl = document.getElementById('hud-p1-progress-bar');
        
        const progressVal = Math.round(15 + position * 0.85); // 15% to 100%
        
        if (progressTextEl) progressTextEl.textContent = `${progressVal}%`;
        if (progressBarEl) progressBarEl.style.width = `${progressVal}%`;
        
        if (statusEl) {
            let statusText = "Completed";
            if (position < 25) {
                statusText = "SITE PREPARATION";
            } else if (position < 60) {
                statusText = "FOUNDATION POUR";
            } else if (position < 95) {
                statusText = "STEEL FRAMING";
            } else {
                statusText = "Completed";
            }
            statusEl.textContent = statusText;
        }
    } else if (projId === '2') {
        const steelEl = document.getElementById('mat-steel-val');
        const concreteEl = document.getElementById('mat-concrete-val');
        const aggregatesEl = document.getElementById('mat-aggregates-val');
        const activeRouteEl = document.getElementById('active-p2-route');
        const movingDotEl = document.getElementById('moving-p2-dot');
        
        if (steelEl && concreteEl && aggregatesEl) {
            const steelVal = Math.round(120 + position * 23.3);
            const concreteVal = Math.round(500 + position * 181);
            const aggregatesVal = Math.round(1200 + position * 308);
            
            steelEl.textContent = `${steelVal.toLocaleString()} Tons`;
            concreteEl.textContent = `${concreteVal.toLocaleString()} m³`;
            aggregatesEl.textContent = `${aggregatesVal.toLocaleString()} Tons`;
        }
        
        if (activeRouteEl) {
            // Flow speed simulated via shifting dashoffset
            activeRouteEl.setAttribute('stroke-dashoffset', position * 2);
        }
        
        if (movingDotEl && activeRouteEl) {
            try {
                const pathLength = activeRouteEl.getTotalLength();
                const point = activeRouteEl.getPointAtLength((position / 100) * pathLength);
                movingDotEl.setAttribute('cx', point.x);
                movingDotEl.setAttribute('cy', point.y);
            } catch (e) {
                // Fallback coordinates if path lengths aren't calculated
                const fallbackX = 10 + (position / 100) * 220;
                // Simple sine wave fallback path
                const fallbackY = 40 - Math.sin((position / 100) * Math.PI * 1.5) * 15;
                movingDotEl.setAttribute('cx', fallbackX);
                movingDotEl.setAttribute('cy', fallbackY);
            }
        }
    } else if (projId === '3') {
        const progressTextEl = document.getElementById('hud-p3-progress');
        const progressBarEl = document.getElementById('hud-p3-progress-bar');
        
        const progressVal = Math.round(5 + position * 0.95); // 5% to 100%
        
        if (progressTextEl) progressTextEl.textContent = `${progressVal}%`;
        if (progressBarEl) progressBarEl.style.width = `${progressVal}%`;
    }
}

/**
 * Scroll Intersection Observer to reveal project cards and trigger animations
 */
function initProjectScrollAnimations() {
    const cards = document.querySelectorAll('.project-card-layout');
    if (cards.length === 0) return;
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-revealed');
                animateStats(entry.target);
                obs.unobserve(entry.target); // Trigger count up and reveal only once
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

/**
 * Animate the stats figures dynamically counting up on entry
 */
function animateStats(cardEl) {
    const statValues = cardEl.querySelectorAll('.p-stat-value');
    statValues.forEach(el => {
        const targetText = el.textContent.trim();
        const targetNum = parseInt(targetText);
        if (isNaN(targetNum)) return;
        
        const suffix = targetText.replace(/[0-9]/g, '');
        let currentNum = 0;
        const duration = 1200; // 1.2 seconds animation speed
        const steps = 40;
        const stepTime = duration / steps;
        const increment = targetNum / steps;
        
        let step = 0;
        const interval = setInterval(() => {
            currentNum += increment;
            step++;
            if (step >= steps) {
                clearInterval(interval);
                el.textContent = targetText; // Match exact final formatting
            } else {
                el.textContent = Math.floor(currentNum) + suffix;
            }
        }, stepTime);
    });
}

/**
 * Testimonial Interactive Console Logic
 */
const TESTIMONIAL_DATA = {
    1: {
        quote: "De Papas Global Ventures delivered our warehouse expansion three weeks ahead of schedule. Their logistics fleet management was outstanding, keeping materials flowing with zero downtime.",
        author: "Engr. Tunde Adebayo",
        role: "Project Director, Chevron Expansion",
        project: "Chevron Site B Expansion",
        delivery: "Ahead (21 Days)"
    },
    2: {
        quote: "The marine jetty construction in Calabar was a massive engineering hurdle due to soil instability. De Papas deployed state-of-the-art pile-driving technology and met all strict safety standards.",
        author: "Captain Robert Cole",
        role: "Port Operations Director, Onne Jetty",
        project: "Onne Port Jetty Phase 2",
        delivery: "100% Safety Compliance"
    },
    3: {
        quote: "We contracted De Papas for civil works in Port Harcourt. Their structural quality and regulatory alignment with COREN standards gave us complete confidence. Outstanding partnership.",
        author: "Hon. Blessing Jumbo",
        role: "Director of Civil Works, Rivers State Ministry",
        project: "PH Ring Road Overpass",
        delivery: "On Budget & Certified"
    }
};

function initTestimonialsConsole() {
    const wrapper = document.getElementById('nt-cards-wrapper');
    if (!wrapper) return;
    
    const track = document.getElementById('nt-cards-track');
    if (!track) return;
    
    const cards = track.querySelectorAll('.nt-card');
    const prevBtn = document.getElementById('nt-prev');
    const nextBtn = document.getElementById('nt-next');
    const dotsContainer = document.getElementById('nt-dots');
    const progressBar = document.getElementById('nt-progress-bar');
    
    if (cards.length === 0) return;
    
    let currentIndex = 0;
    const slideDuration = 6000; // 6 seconds per slide
    let progress = 0;
    let progressTimer = null;
    let isHovered = false;
    
    // Dynamically build pagination dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        cards.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = `nt-dot${index === 0 ? ' active' : ''}`;
            dot.setAttribute('data-index', index);
            dotsContainer.appendChild(dot);
            
            dot.addEventListener('click', () => {
                currentIndex = index;
                showCard(currentIndex);
                resetProgressAndTimer();
            });
        });
    }
    
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.nt-dot') : [];
    
    function showCard(index) {
        if (track) {
            track.style.transform = `translateX(-${index * 100}%)`;
        }
        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        
        if (dots.length > 0) {
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
    
    function startProgress() {
        clearInterval(progressTimer);
        progress = 0;
        if (progressBar) progressBar.style.width = '0%';
        
        const tickTime = 50; // Update every 50ms
        progressTimer = setInterval(() => {
            if (isHovered) return; // Pause progress on hover
            
            progress += (tickTime / slideDuration) * 100;
            if (progress >= 100) {
                progress = 100;
                if (progressBar) progressBar.style.width = '100%';
                clearInterval(progressTimer);
                // Advance to the next slide
                currentIndex = (currentIndex + 1) % cards.length;
                showCard(currentIndex);
                startProgress();
            } else {
                if (progressBar) progressBar.style.width = `${progress}%`;
            }
        }, tickTime);
    }
    
    function resetProgressAndTimer() {
        startProgress();
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            showCard(currentIndex);
            resetProgressAndTimer();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            showCard(currentIndex);
            resetProgressAndTimer();
        });
    }
    
    // Pause auto-sliding on hover
    wrapper.addEventListener('mouseenter', () => {
        isHovered = true;
    });
    wrapper.addEventListener('mouseleave', () => {
        isHovered = false;
    });
    
    // Initialize
    showCard(currentIndex);
    startProgress();
}

/**
 * Contact & Lead Request Specifications Portal Controller
 */
function initContactPortal() {
    const portalForm = document.getElementById('lead-portal-form');
    if (!portalForm) return;

    // 1. Division selector card interactive toggles
    const divisionCards = portalForm.querySelectorAll('.division-card-modern');
    const selectedDivisionInput = document.getElementById('selected-division');

    divisionCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active from all
            divisionCards.forEach(c => {
                c.classList.remove('active');
                const indicator = c.querySelector('.division-indicator');
                if (indicator) indicator.textContent = 'Select Division';
            });

            // Set active on clicked
            card.classList.add('active');
            const indicator = card.querySelector('.division-indicator');
            if (indicator) indicator.textContent = 'Active Selection';

            // Set hidden input value
            const divisionValue = card.getAttribute('data-division');
            if (selectedDivisionInput) {
                selectedDivisionInput.value = divisionValue;
            }
        });
    });

    // 2. Form Submit Simulation
    const submitBtn = document.getElementById('form-submit-btn-modern');

    portalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        }

        // Simulate secure server upload connection
        setTimeout(() => {
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }

            // Success feedback toast notification
            showThemeToast('Specifications Transmitted: Secure connection logged.');
            portalForm.reset();

            // Reset division selector cards to default (Civil)
            divisionCards.forEach(c => {
                c.classList.remove('active');
                const indicator = c.querySelector('.division-indicator');
                if (indicator) indicator.textContent = 'Select Division';
            });

            const defaultCard = portalForm.querySelector('.division-card-modern[data-division="civil"]');
            if (defaultCard) {
                defaultCard.classList.add('active');
                const indicator = defaultCard.querySelector('.division-indicator');
                if (indicator) indicator.textContent = 'Active Selection';
            }

            if (selectedDivisionInput) {
                selectedDivisionInput.value = 'civil';
            }
        }, 2200);
    });

    // 3. Scroll reveal binding using IntersectionObserver for animations
    const contactSec = document.getElementById('contact');
    if (contactSec) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    contactSec.classList.add('section-revealed');
                }
            });
        }, { threshold: 0.15 });
        sectionObserver.observe(contactSec);
    }
}

/**
 * FAQ Accordion Toggle Interaction
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');
        
        if (!trigger || !content) return;

        // Set initial heights for active items
        if (item.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = '0px';
        }

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherTrigger = otherItem.querySelector('.faq-trigger');
                    const otherContent = otherItem.querySelector('.faq-content');
                    if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                    if (otherContent) otherContent.style.maxHeight = '0px';
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                trigger.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = '0px';
            } else {
                item.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}



/**
 * Footer Newsletter Subscription Controller
 */
function initFooterNewsletter() {
    const form = document.getElementById('footer-newsletter-form');
    if (!form) return;

    const submitBtn = form.querySelector('.btn-footer-subscribe');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        }

        setTimeout(() => {
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }

            showThemeToast('Subscription Confirmed: Operational digests linked.');
            form.reset();
        }, 2000);
    });
}
