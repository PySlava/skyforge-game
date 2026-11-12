/**
 * ============================================================================
 * RENDER & UI MODULE
 * ============================================================================
 */

function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const toast = document.createElement("div");
    const colors = {
        info: "bg-slate-900/95 border-cyan-500/50 text-cyan-200",
        success: "bg-emerald-950/95 border-emerald-500/60 text-emerald-200",
        gold: "bg-amber-950/95 border-amber-500/60 text-amber-200"
    };
    toast.className = `px-4 py-2.5 rounded-xl border shadow-xl text-xs font-bold backdrop-blur-md transition-all duration-300 transform translate-y-2 opacity-0 ${colors[type] || colors.info}`;
    toast.textContent = message;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.remove("translate-y-2", "opacity-0"));
    setTimeout(() => {
        toast.classList.add("opacity-0", "-translate-y-2");
        setTimeout(() => toast.remove(), 300);
    }, 2400);
}

function showFloatingDamage(targetId, amount, isCrit = false, isPlayerDamage = false) {
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;
    const popup = document.createElement("div");
    popup.className = "damage-popup";
    popup.textContent = (isPlayerDamage ? "-" : "") + formatNumber(amount) + (isCrit ? "!" : "");
    popup.style.color = isPlayerDamage ? "#fb7185" : (isCrit ? "#fbbf24" : "#ffffff");
    popup.style.fontSize = isCrit ? "18px" : "14px";
    popup.style.left = `${20 + Math.random() * 45}px`;
    popup.style.top = `${10 + Math.random() * 20}px`;
    targetEl.appendChild(popup);
    setTimeout(() => popup.remove(), 850);
}

function triggerHitFlash(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.classList.remove("hit-flash");
    void el.offsetWidth;
    el.classList.add("hit-flash");
}

function renderPlayerPlane() {
    const container = document.getElementById("player-svg-container");
    if (container && typeof AIRCRAFT_SVGS !== 'undefined') {
        container.innerHTML = AIRCRAFT_SVGS[state.currentPlaneId] || AIRCRAFT_SVGS[1];
    }
}

function renderEvolutionList() {
    const container = document.getElementById("evolution-list");
    if (!container) return;
    container.innerHTML = "";
    PLANES_DATA.forEach(plane => {
        const isUnlocked = state.unlockedPlanes.includes(plane.id);
        const isEquipped = state.currentPlaneId === plane.id;
        const canAfford = state.gold >= plane.unlockGold && state.scrap >= plane.unlockScrap;
        const card = document.createElement("div");
        card.className = `p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${isEquipped ? "bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.15)]" : isUnlocked ? "bg-slate-900/90 border-slate-700/80" : "bg-slate-950/70 border-slate-800/80"}`;

        let actionBtnHtml = isEquipped
            ? `<span class="px-3 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-extrabold whitespace-nowrap">У небі</span>`
            : isUnlocked
            ? `<button onclick="equipPlane(${plane.id})" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 text-xs font-bold transition-colors whitespace-nowrap cursor-pointer">Вибрати</button>`
            : `<button onclick="unlockPlane(${plane.id})" ${canAfford ? "" : "disabled"} class="px-3 py-2 rounded-xl text-xs font-extrabold transition-all flex flex-col items-end whitespace-nowrap ${canAfford ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-navy-950 shadow-lg cursor-pointer" : "bg-slate-800/70 text-slate-500 border border-slate-700/60 cursor-not-allowed"}"><span>Зібрати</span><span class="text-[10px] font-bold opacity-90">${formatNumber(plane.unlockGold)} зол. · ${formatNumber(plane.unlockScrap)} дет.</span></button>`;

        card.innerHTML = `
            <div class="flex items-center gap-3 min-w-0">
                <div class="w-16 h-12 rounded-xl bg-slate-950/90 border border-slate-800 p-1.5 shrink-0 flex items-center justify-center ${!isUnlocked ? 'opacity-60 grayscale' : ''}">
                    ${AIRCRAFT_SVGS[plane.id]}
                </div>
                <div class="min-w-0">
                    <div class="flex items-center gap-1.5">
                        <span class="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">${plane.era}</span>
                        <h4 class="text-xs sm:text-sm font-extrabold text-white truncate">${plane.name}</h4>
                    </div>
                    <p class="text-[11px] text-slate-400 truncate mt-0.5">${plane.subtitle}</p>
                    <div class="flex items-center gap-2.5 mt-1 text-[10px] font-bold">
                        <span class="text-rose-400">ATK: ${formatNumber(plane.baseAtk)}</span>
                        <span class="text-emerald-400">HP: ${formatNumber(plane.baseHp)}</span>
                    </div>
                </div>
            </div>
            <div class="shrink-0">${actionBtnHtml}</div>
        `;
        container.appendChild(card);
    });
}

function renderUpgradesList() {
    const container = document.getElementById("upgrades-list");
    if (!container) return;
    container.innerHTML = "";
    UPGRADES_CONFIG.forEach(upg => {
        const lvl = state.upgrades[upg.id] || 0;
        const cost = getUpgradeCost(upg);
        const isGold = upg.currency === "gold";
        const canAfford = isGold ? state.gold >= cost : state.scrap >= cost;
        const card = document.createElement("div");
        card.className = "bg-slate-900/95 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between gap-3";
        card.innerHTML = `
            <div class="flex items-center gap-3 min-w-0">
                <div class="w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 font-black text-sm ${upg.iconColor}">+${lvl}</div>
                <div class="min-w-0">
                    <h4 class="text-xs sm:text-sm font-extrabold text-white truncate">${upg.name}</h4>
                    <p class="text-[11px] text-slate-400 mt-0.5 leading-snug">${upg.desc}</p>
                </div>
            </div>
            <button onclick="buyUpgrade('${upg.id}')" ${canAfford ? "" : "disabled"} class="shrink-0 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex flex-col items-center min-w-[92px] ${canAfford ? (isGold ? "bg-amber-500 hover:bg-amber-400 text-navy-950 shadow-md cursor-pointer" : "bg-cyan-500 hover:bg-cyan-400 text-navy-950 shadow-md cursor-pointer") : "bg-slate-800/80 text-slate-500 border border-slate-700/60 cursor-not-allowed"}">
                <span>Покращити</span>
                <span class="text-[10px] font-bold mt-0.5">${formatNumber(cost)} ${isGold ? "золота" : "деталей"}</span>
            </button>
        `;
        container.appendChild(card);
    });
}

function renderContractsList() {
    const container = document.getElementById("contracts-list");
    if (!container) return;
    container.innerHTML = "";
    state.contracts.forEach((contract, index) => {
        const isDone = contract.current >= contract.target;
        const pct = Math.min(100, (contract.current / contract.target) * 100);
        const card = document.createElement("div");
        card.className = `rounded-2xl p-3.5 border transition-all ${isDone ? "bg-amber-950/25 border-amber-500/50" : "bg-slate-900/95 border-slate-800"}`;
        card.innerHTML = `
            <div class="flex items-start justify-between gap-2 mb-2">
                <div>
                    <h4 class="text-xs sm:text-sm font-extrabold text-white">${contract.title}</h4>
                    <p class="text-[11px] text-slate-400">${contract.desc}: <span class="text-slate-200 font-bold">${contract.current}/${contract.target}</span></p>
                </div>
                <div class="text-right text-[11px] font-bold">
                    <span class="text-amber-400 block">+${formatNumber(contract.rewardGold)} золота</span>
                    <span class="text-cyan-400 block">+${formatNumber(contract.rewardScrap)} деталей</span>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <div class="flex-1 h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div class="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-200" style="width: ${pct}%"></div>
                </div>
                <button onclick="claimContract(${index})" ${isDone ? "" : "disabled"} class="px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all shrink-0 ${isDone ? "bg-emerald-500 hover:bg-emerald-400 text-navy-950 shadow-md animate-pulse cursor-pointer" : "bg-slate-800 text-slate-500 cursor-not-allowed"}">
                    ${isDone ? "Забрати" : "В процесі"}
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderAllDynamicLists() {
    renderEvolutionList();
    renderUpgradesList();
    renderContractsList();
}

function updateHudUI() {
    const plane = getCurrentPlane();
    const stats = getPlayerStats();
    const forgeStats = getForgeStats();

    const elGold = document.getElementById("ui-gold");
    if (elGold) elGold.textContent = formatNumber(state.gold);

    const elScrap = document.getElementById("ui-scrap");
    if (elScrap) elScrap.textContent = formatNumber(state.scrap);

    const elEra = document.getElementById("ui-header-era");
    if (elEra) elEra.textContent = plane.era;

    const elPlaneName = document.getElementById("ui-header-plane");
    if (elPlaneName) elPlaneName.textContent = plane.name;

    const elWave = document.getElementById("ui-wave-text");
    if (elWave) elWave.textContent = `Хвиля ${state.stage}-${state.subWave}`;

    const elDps = document.getElementById("ui-dps");
    if (elDps) elDps.textContent = formatNumber(stats.dps);

    const playerHpPct = Math.max(0, Math.min(100, (battle.playerHp / battle.playerMaxHp) * 100));
    const elPlayerBar = document.getElementById("ui-player-hp-bar");
    if (elPlayerBar) elPlayerBar.style.width = `${playerHpPct}%`;

    const elPlayerHpText = document.getElementById("ui-player-hp-text");
    if (elPlayerHpText) elPlayerHpText.textContent = `${formatNumber(battle.playerHp)}/${formatNumber(battle.playerMaxHp)}`;

    if (battle.isRepairing) {
        const elRepair = document.getElementById("ui-repair-timer");
        if (elRepair) elRepair.textContent = `${Math.max(0, battle.repairTimer).toFixed(1)}с`;
    }

    const elEnemyName = document.getElementById("ui-enemy-name");
    if (elEnemyName) elEnemyName.textContent = battle.enemyName;

    const enemyHpPct = Math.max(0, Math.min(100, (battle.enemyHp / battle.enemyMaxHp) * 100));
    const elEnemyBar = document.getElementById("ui-enemy-hp-bar");
    if (elEnemyBar) elEnemyBar.style.width = `${enemyHpPct}%`;

    const elEnemyHpText = document.getElementById("ui-enemy-hp-text");
    if (elEnemyHpText) elEnemyHpText.textContent = formatNumber(battle.enemyHp);

    const elAtk = document.getElementById("ui-stat-atk");
    if (elAtk) elAtk.textContent = formatNumber(stats.atk);

    const elHp = document.getElementById("ui-stat-hp");
    if (elHp) elHp.textContent = formatNumber(stats.maxHp);

    const elSpd = document.getElementById("ui-stat-spd");
    if (elSpd) elSpd.textContent = `${stats.fireRate.toFixed(1)}/с`;

    const elCraftTier = document.getElementById("ui-craft-tier-label");
    if (elCraftTier) elCraftTier.textContent = `Рівень цеху ${state.craftLevel} (+${(state.craftLevel - 1) * 9}% статів)`;

    const elCraftTimer = document.getElementById("ui-craft-timer");
    if (elCraftTimer) elCraftTimer.textContent = `${state.craftProgress.toFixed(1)} / ${state.craftDuration.toFixed(1)} с`;

    const elCraftBar = document.getElementById("ui-craft-bar");
    if (elCraftBar) elCraftBar.style.width = `${Math.min(100, (state.craftProgress / state.craftDuration) * 100)}%`;

    const elTapPower = document.getElementById("ui-tap-power");
    if (elTapPower) elTapPower.textContent = forgeStats.tapPower.toFixed(1);
}