// ═══════════════════════════════════════════════════════════════
// SKILLS SECTION — GIT GRAPH (Desktop Conveyor Carousel + Mobile Grid)
// ═══════════════════════════════════════════════════════════════

const SKILLS_DATA = [
    {
        tier: 'core',
        label: 'core tools',
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
        label: 'extended tools',
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
        label: 'experimental tools',
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

function buildItems() {
    const items = [];
    SKILLS_DATA.forEach((group) => {
        group.skills.forEach((skill) => {
            items.push({ ...skill, tier: group.tier, lane: LANE_INDEX[group.tier] });
        });
    });
    return items;
}

function svgEl(tag, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
}

function renderSingleCanvas(canvasContainer, items, canvasWidth, canvasHeight, nodeGap, iconSize, laneGap, yStart, X_PAD) {
    const lastIndex = items.length - 1;
    const laneY = (lane) => yStart + lane * laneGap;
    const itemX = (i) => X_PAD + i * nodeGap;

    const firstIndexOfLane = {};
    items.forEach((item, i) => {
        if (!(item.lane in firstIndexOfLane)) firstIndexOfLane[item.lane] = i;
    });

    const svg = svgEl('svg', { viewBox: `0 0 ${canvasWidth} ${canvasHeight}` });
    Object.assign(svg.style, { position: 'absolute', inset: '0', width: '100%', height: '100%' });
    canvasContainer.appendChild(svg);

    // Branch main paths
    Object.keys(firstIndexOfLane).forEach((laneKey) => {
        const lane = Number(laneKey);
        const y = laneY(lane);
        const x1 = itemX(firstIndexOfLane[lane]);
        const x2 = itemX(lastIndex);
        const path = svgEl('path', { d: `M ${x1} ${y} L ${x2} ${y}` });
        path.classList.add('graph-line');
        path.style.stroke = COLUMN_VAR[TIER_BY_LANE[lane]];
        svg.appendChild(path);
    });

    // Fork curves
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
        svg.appendChild(path);
    });

    // Section Labels inline above branch start
    Object.keys(firstIndexOfLane).forEach((laneKey) => {
        const lane = Number(laneKey);
        const startX = itemX(firstIndexOfLane[lane]);
        const startY = laneY(lane);
        const color = COLUMN_VAR[TIER_BY_LANE[lane]];

        const branchLabel = document.createElement('div');
        branchLabel.className = 'skill-branch-label';
        branchLabel.style.left = `${startX}px`;
        branchLabel.style.top = `${startY - (iconSize / 2) - 4}px`;
        branchLabel.style.color = color;
        branchLabel.textContent = LANE_TEXT[TIER_BY_LANE[lane]];

        canvasContainer.appendChild(branchLabel);
    });

    // Skill icon nodes
    items.forEach((item, i) => {
        const color = COLUMN_VAR[TIER_BY_LANE[item.lane]];
        const x = itemX(i);
        const y = laneY(item.lane);

        const node = document.createElement('div');
        node.className = 'skill-node-h';
        node.title = item.name;
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;

        node.innerHTML = `
            <span class="skill-node-h-icon" style="border-color:${color}; width:${iconSize}px; height:${iconSize}px;">
                <img src="${item.icon}" alt="${item.name}">
            </span>
        `;
        canvasContainer.appendChild(node);
    });
}

function buildGraph(mount) {
    const isMobile = window.innerWidth <= 640;

    if (isMobile) {
        // ── MOBILE LAYOUT (Categorized Skill Cards) ──
        mount.innerHTML = SKILLS_DATA.map((group) => `
            <div class="mobile-skill-group">
                <div class="mobile-group-header" style="color:${COLUMN_VAR[group.tier]}">
                    <span class="mobile-group-dot" style="background:${COLUMN_VAR[group.tier]}"></span>
                    <span>${LANE_TEXT[group.tier]}</span>
                </div>
                <div class="mobile-skills-grid">
                    ${group.skills.map((skill) => `
                        <div class="mobile-skill-pill">
                            <img src="${skill.icon}" alt="${skill.name}" loading="lazy">
                            <span class="mobile-skill-name">${skill.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

    } else {
        // ── DESKTOP LAYOUT (Conveyor Belt Carousel) ──
        const items = buildItems();
        const lastIndex = items.length - 1;
        // Inside buildGraph() under the desktop section:
        // Inside buildGraph() under the desktop layout section:

        const X_PAD = 40;
        const nodeGap = 90;
        const iconSize = 56;
        const laneGap = 110;  /* Increased from 72 to spread the branches vertically */
        const yStart = 70;    /* Increased from 48 to give more top padding above the top branch */
        const canvasWidth = X_PAD * 2 + lastIndex * nodeGap;
        const canvasHeight = yStart * 2 + 2 * laneGap;

        mount.innerHTML = `
            <div class="skills-graph-scroll">
                <div class="skills-graph-track">
                    <div class="skills-graph-canvas canvas-orig" style="width:${canvasWidth}px; height:${canvasHeight}px;"></div>
                    <div class="skills-graph-canvas canvas-dup" style="width:${canvasWidth}px; height:${canvasHeight}px;"></div>
                </div>
            </div>
        `;

        const canvasOrig = mount.querySelector('.canvas-orig');
        const canvasDup = mount.querySelector('.canvas-dup');

        renderSingleCanvas(canvasOrig, items, canvasWidth, canvasHeight, nodeGap, iconSize, laneGap, yStart, X_PAD);
        renderSingleCanvas(canvasDup, items, canvasWidth, canvasHeight, nodeGap, iconSize, laneGap, yStart, X_PAD);

        // Set SVG path dash offsets for desktop animation
        mount.querySelectorAll('.graph-line').forEach((path) => {
            const len = path.getTotalLength();
            path.style.strokeDasharray = String(len);
            path.style.strokeDashoffset = String(len);
        });
    }
}

export function initSkillsGitGraph(selector = '#skills-graph-body') {
    const mount = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!mount) return;

    const section = mount.closest('.skills-graph-section') || mount;

    buildGraph(mount);

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
        { threshold: 0.15 }
    );
    observer.observe(section);

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            buildGraph(mount);
            if (section.classList.contains('in-view')) {
                mount.querySelectorAll('.graph-line').forEach((path) => {
                    path.style.strokeDashoffset = '0';
                });
            }
        }, 120);
    });
}