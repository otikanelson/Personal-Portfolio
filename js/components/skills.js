// ═══════════════════════════════════════════════════════════════
// SKILLS SECTION — GIT GRAPH (horizontal)
// Renders skills as a horizontal commit graph, closer to GitHub's
// own "Network" graph view than the CLI `git log --graph` style:
// Core Stack runs as the main lane (top), Extended Stack and Also
// Worked With fork off into their own parallel lanes below it.
// Lane labels stay fixed on the left; the timeline itself scrolls
// horizontally when it overflows the viewport.
// ═══════════════════════════════════════════════════════════════

// ── Real stack, pulled from the existing skill cards ──
const SKILLS_DATA = [
    {
        tier: 'core',
        label: 'core',
        skills: [
            { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
            { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
            { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
            { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
            { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
            { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
            { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
            { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tailwindcss.svg' },
            { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
            { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        ],
    },
    {
        tier: 'extended',
        label: 'extended',
        skills: [
            { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
            { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
            { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
            { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
            { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
            { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        ],
    },
    {
        tier: 'also',
        label: 'experimental',
        skills: [
            { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
            { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
            { name: 'IntelliJ IDEA', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg' },
        ],
    },
];

const COLUMN_VAR = {
    core: 'var(--branch-core)',
    extended: 'var(--branch-extended)',
    also: 'var(--branch-also)',
};

const LANE_INDEX = { core: 0, extended: 1, also: 2 };
const TIER_BY_LANE = { 0: 'core', 1: 'extended', 2: 'also' };
const LANE_TEXT = { core: 'core', extended: 'extended', also: 'experimental' };

const BREAKPOINT = 640;

function getMetrics() {
    const isMobile = window.innerWidth <= BREAKPOINT;
    return {
        isMobile,
        laneGap: isMobile ? 84 : 104,     // vertical distance between lanes
        nodeGap: isMobile ? 50 : 68,      // horizontal distance between commits
        xStart: isMobile ? 30 : 40,
        yStart: isMobile ? 30 : 36,
        iconSize: isMobile ? 22 : 28,
    };
}

function flattenItems() {
    const items = [];
    SKILLS_DATA.forEach((tier) => {
        tier.skills.forEach((skill) => {
            items.push({ ...skill, tier: tier.tier, lane: LANE_INDEX[tier.tier] });
        });
    });
    return items;
}

function svgEl(tag, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
}

function buildGraph(mount) {
    const m = getMetrics();
    const items = flattenItems();
    const lastIndex = items.length - 1;

    const laneY = (lane) => m.yStart + lane * m.laneGap;
    const itemX = (i) => m.xStart + i * m.nodeGap;

    const canvasWidth = itemX(lastIndex) + m.xStart;
    const canvasHeight = m.yStart * 2 + 2 * m.laneGap;

    // First index at which each lane appears (its fork point)
    const firstIndexOfLane = {};
    items.forEach((item, i) => {
        if (!(item.lane in firstIndexOfLane)) firstIndexOfLane[item.lane] = i;
    });

    mount.innerHTML = `
        <div class="skills-graph-lane-labels" style="height:${canvasHeight}px;">
            ${[0, 1, 2].map((lane) => `
                <div class="skills-graph-lane-label" style="top:${laneY(lane)}px; color:${COLUMN_VAR[TIER_BY_LANE[lane]]}">
                    <span class="lane-dot" style="background:${COLUMN_VAR[TIER_BY_LANE[lane]]}"></span>
                    <span>${LANE_TEXT[TIER_BY_LANE[lane]]}</span>
                </div>
            `).join('')}
        </div>
        <div class="skills-graph-scroll">
            <div class="skills-graph-canvas" style="width:${canvasWidth}px; height:${canvasHeight}px;"></div>
        </div>
    `;

    const canvas = mount.querySelector('.skills-graph-canvas');

    const svg = svgEl('svg', {
        viewBox: `0 0 ${canvasWidth} ${canvasHeight}`,
        preserveAspectRatio: 'none',
    });
    svg.style.position = 'absolute';
    svg.style.inset = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.overflow = 'visible';
    canvas.appendChild(svg);

    // Straight lane lines: from each lane's fork point to the last item
    Object.keys(firstIndexOfLane).forEach((laneKey) => {
        const lane = Number(laneKey);
        const y = laneY(lane);
        const x1 = itemX(firstIndexOfLane[lane]);
        const x2 = itemX(lastIndex);
        const path = svgEl('path', { d: `M ${x1} ${y} L ${x2} ${y}` });
        path.classList.add('graph-line');
        path.style.stroke = COLUMN_VAR[TIER_BY_LANE[lane]];
        path.dataset.delay = String(firstIndexOfLane[lane] * 40);
        svg.appendChild(path);
    });

    // Curved fork connectors where a lane branches off the core lane
    Object.keys(firstIndexOfLane).forEach((laneKey) => {
        const lane = Number(laneKey);
        if (lane === 0) return;
        const forkIndex = firstIndexOfLane[lane];
        const parentX = itemX(Math.max(forkIndex - 1, 0));
        const childX = itemX(forkIndex);
        const parentY = laneY(0);
        const childY = laneY(lane);
        const midX = (parentX + childX) / 2;
        const d = `M ${parentX} ${parentY} C ${midX} ${parentY}, ${midX} ${childY}, ${childX} ${childY}`;
        const path = svgEl('path', { d });
        path.classList.add('graph-line');
        path.style.stroke = COLUMN_VAR[TIER_BY_LANE[lane]];
        path.dataset.delay = String(forkIndex * 40);
        svg.appendChild(path);
    });

    // Prime dashoffset for the draw-in animation
    svg.querySelectorAll('path').forEach((path) => {
        const len = path.getTotalLength();
        path.style.strokeDasharray = String(len);
        path.style.strokeDashoffset = String(len);
        path.style.transitionDelay = `${path.dataset.delay}ms`;
    });

    // Nodes: small circular icon sitting on the line, label below it
    items.forEach((item, i) => {
        const color = COLUMN_VAR[TIER_BY_LANE[item.lane]];
        const x = itemX(i);
        const y = laneY(item.lane);

        const node = document.createElement('div');
        node.className = 'skill-node-h';
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
        node.style.transitionDelay = `${i * 40}ms`;
        node.innerHTML = `
            <span class="skill-node-h-icon" style="border-color:${color}; width:${m.iconSize}px; height:${m.iconSize}px;">
                <img src="${item.icon}" alt="${item.name}" loading="lazy">
            </span>
            <span class="skill-node-h-label">${item.name}</span>
        `;
        canvas.appendChild(node);
    });
}

export function initSkillsGitGraph(selector = '#skills-graph-body') {
    const mount = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!mount) return;

    const section = mount.closest('.skills-graph-section') || mount;

    let isMobile = getMetrics().isMobile;
    buildGraph(mount);

    // Scroll-triggered reveal: adds .in-view once on the section,
    // which drives the CSS transitions and kicks the SVG
    // stroke-dashoffset draw-in animation.
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    section.classList.add('in-view');
                    mount.querySelectorAll('.graph-line').forEach((path) => {
                        path.style.strokeDashoffset = '0';
                    });
                    observer.unobserve(section);
                }
            });
        },
        { threshold: 0.2 }
    );
    observer.observe(section);

    // Rebuild only when crossing the mobile/desktop breakpoint
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const nowMobile = getMetrics().isMobile;
            if (nowMobile !== isMobile) {
                isMobile = nowMobile;
                buildGraph(mount);
                if (section.classList.contains('in-view')) {
                    mount.querySelectorAll('.skill-node-h, .graph-line').forEach((el) => {
                        el.style.transitionDelay = '0ms';
                    });
                    mount.querySelectorAll('.graph-line').forEach((path) => {
                        path.style.strokeDashoffset = '0';
                    });
                }
            }
        }, 250);
    });
}