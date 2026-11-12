/**
 * ============================================================================
 * GAME STATE & LOGIC MODULE
 * ============================================================================
 */

function formatNumber(num) {
    if (num < 1000) return Math.floor(num).toString();
    const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx"];
    const suffixNum = Math.floor(("" + Math.floor(num)).length / 3);
    if (suffixNum >= suffixes.length) return num.toExponential(2);
    let shortValue = parseFloat((suffixNum !== 0 ? (num / Math.pow(1000, suffixNum)) : num).toPrecision(3));
    if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(1);
    return shortValue + suffixes[suffixNum];
}

function getCurrentPlane() {
    return PLANES_DATA.find(p => p.id === state.currentPlaneId) || PLANES_DATA[0];
}

function getPlayerStats() {
    const plane = getCurrentPlane();
    const forgeBonus = 1 + (state.craftLevel - 1) * 0.09;
    const atkMult = (1 + state.upgrades.weapons * 0.22) * forgeBonus;
    const hpMult = (1 + state.upgrades.armor * 0.26) * forgeBonus;
    const atk = Math.round(plane.baseAtk * atkMult);
    const maxHp = Math.round(plane.baseHp * hpMult);
    const fireRate = plane.fireRate;
    const dps = Math.round(atk * fireRate);
    return { atk, maxHp, fireRate, dps };
}

function getForgeStats() {
    const tapPower = 1.0 + state.upgrades.tools * 0.45;
    const autoSpeed = 1.0 + state.upgrades.tools * 0.25;
    return { tapPower, autoSpeed };
}

function getLootMultiplier() {
    return 1 + state.upgrades.logistics * 0.28;
}

function getUpgradeCost(upgConfig) {
    const lvl = state.upgrades[upgConfig.id] || 0;
    return Math.floor(upgConfig.baseCost * Math.pow(upgConfig.costMult, lvl));
}

function generateContracts() {
    const scale = Math.max(1, state.stage + (state.currentPlaneId - 1) * 2.5);
    state.contracts = CONTRACT_TEMPLATES.map((tpl, idx) => ({
        uid: Date.now() + idx,
        type: tpl.id,
        title: tpl.title,
        desc: tpl.desc,
        current: 0,
        target: tpl.id === "bosses" ? Math.max(1, Math.floor(1 + state.stage / 6)) : tpl.baseTarget + Math.floor(scale * 1.4),
        rewardGold: Math.floor(tpl.goldMult * Math.pow(1.48, scale - 1)),
        rewardScrap: Math.max(2, Math.floor(tpl.scrapMult * Math.pow(1.32, scale - 1)))
    }));
}

function advanceContract(type, amount = 1) {
    let anyReady = false;
    state.contracts.forEach(c => {
        if (c.type === type && c.current < c.target) {
            c.current = Math.min(c.target, c.current + amount);
        }
        if (c.current >= c.target) anyReady = true;
    });
    const badge = document.getElementById("ui-contract-badge");
    if (badge) {
        if (anyReady) badge.classList.remove("hidden");
        else badge.classList.add("hidden");
    }
}

function saveGame() {
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(state));
        if (typeof saveGameToCloud === 'function') {
            saveGameToCloud();
        }
    } catch (err) {}
}

function loadGame() {
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            state = { ...state, ...parsed };
            state.upgrades = { ...state.upgrades, ...(parsed.upgrades || {}) };
        }
    } catch (err) {}
    if (!state.contracts || state.contracts.length === 0) {
        generateContracts();
    }
}