/**
 * ============================================================================
 * BATTLE ENGINE & GAME LOOP MODULE
 * ============================================================================
 */

let clouds = [];
let projectiles = [];
let explosions = [];

function spawnWaveEnemy() {
    const waveIndex = (state.stage - 1) * 5 + state.subWave;
    const isBoss = state.subWave === 5;
    battle.isBoss = isBoss;
    const hpScale = Math.pow(1.36, waveIndex - 1);
    const atkScale = Math.pow(1.27, waveIndex - 1);

    if (isBoss) {
        if (state.stage >= 8) {
            battle.enemyName = `Орбітальний Дредноут MK-${state.stage}`;
            battle.enemyType = "dreadnought";
        } else {
            battle.enemyName = `Фортеця Ту-160M-${state.stage}`;
            battle.enemyType = "boss";
        }
        battle.enemyMaxHp = Math.round(190 * hpScale);
        battle.enemyAtk = Math.round(14 * atkScale);
    } else if (state.stage >= 6 && state.subWave >= 3) {
        battle.enemyName = `Стратосферний Крейсер #${waveIndex}`;
        battle.enemyType = "cruiser";
        battle.enemyMaxHp = Math.round(80 * hpScale);
        battle.enemyAtk = Math.round(9.5 * atkScale);
    } else if (state.subWave >= 3) {
        battle.enemyName = `МіГ-29СМТ #${waveIndex}`;
        battle.enemyType = "interceptor";
        battle.enemyMaxHp = Math.round(65 * hpScale);
        battle.enemyAtk = Math.round(8 * atkScale);
    } else {
        battle.enemyName = `БПЛА «Оріон-${waveIndex}»`;
        battle.enemyType = "drone";
        battle.enemyMaxHp = Math.round(42 * hpScale);
        battle.enemyAtk = Math.round(5 * atkScale);
    }

    battle.enemyHp = battle.enemyMaxHp;
    battle.enemyAttackCooldown = 1.4;

    const enemyContainer = document.getElementById("enemy-svg-container");
    if (enemyContainer && typeof ENEMY_SVGS !== 'undefined') {
        enemyContainer.innerHTML = ENEMY_SVGS[battle.enemyType];
    }

    const bossBadge = document.getElementById("ui-boss-badge");
    if (bossBadge) {
        if (isBoss) {
            bossBadge.classList.remove("hidden");
            bossBadge.classList.add("flex");
        } else {
            bossBadge.classList.add("hidden");
            bossBadge.classList.remove("flex");
        }
    }
}

const canvas = document.getElementById("battle-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;

function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}

function initClouds() {
    clouds = [];
    for (let i = 0; i < 9; i++) {
        clouds.push({
            x: Math.random() * 800,
            y: 25 + Math.random() * 180,
            w: 50 + Math.random() * 70,
            h: 14 + Math.random() * 14,
            speed: 25 + Math.random() * 45,
            alpha: 0.04 + Math.random() * 0.08
        });
    }
}

function spawnProjectile(fromPlayer, plane) {
    if (!canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    if (fromPlayer) {
        const pType = plane.projectileType || "bullet";
        projectiles.push({
            x: w * 0.25,
            y: h * 0.52 + (pType === "bomb" ? 6 : (Math.random() * 10 - 5)),
            vx: pType === "railgun" || pType === "beam" ? w * 2.1 : (pType === "bomb" ? w * 1.05 : w * 1.4),
            color: plane.bulletColor || "#fbbf24",
            isPlayer: true,
            type: pType,
            len: pType === "railgun" || pType === "beam" ? 42 : (pType === "plasma" ? 26 : 16)
        });
    } else {
        projectiles.push({
            x: w * 0.74,
            y: h * 0.52 + (Math.random() * 10 - 5),
            vx: -w * 1.15,
            color: battle.enemyType === "dreadnought" || battle.enemyType === "cruiser" ? "#e879f9" : "#f43f5e",
            isPlayer: false,
            type: "enemy",
            len: 16
        });
    }
}

function spawnExplosion(xRatio, yRatio, color, count = 14) {
    if (!canvas) return;
    const x = canvas.width * xRatio;
    const y = canvas.height * yRatio;
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 30 + Math.random() * 120;
        explosions.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 0.45 + Math.random() * 0.25, maxLife: 0.7, size: 2 + Math.random() * 4, color });
    }
}

function completeCraftCycle() {
    state.craftLevel += 1;
    state.craftProgress = 0;
    state.craftDuration = 8.0 + Math.floor((state.craftLevel - 1) / 5) * 1.5;
    const scrapBonus = Math.max(2, Math.round((2 + Math.pow(state.currentPlaneId, 1.8) * 2) * getLootMultiplier()));
    state.scrap += scrapBonus;
    const stats = getPlayerStats();
    battle.playerMaxHp = stats.maxHp;
    battle.playerHp = Math.min(battle.playerMaxHp, battle.playerHp + Math.round(stats.maxHp * 0.25));
    advanceContract("crafts", 1);
    showToast(`Збірку завершено! Рівень цеху ${state.craftLevel} (+${formatNumber(scrapBonus)} деталей)`, "gold");
    renderAllDynamicLists();
    saveGame();
}

function handleEnemyDefeated() {
    const waveIndex = (state.stage - 1) * 5 + state.subWave;
    const lootMult = getLootMultiplier();
    const bossMult = battle.isBoss ? 3.8 : 1.0;
    const goldDrop = Math.max(5, Math.round((12 * Math.pow(1.30, waveIndex - 1)) * lootMult * bossMult));
    const scrapDrop = Math.max(1, Math.round((1.5 * Math.pow(1.20, waveIndex - 1)) * lootMult * (battle.isBoss ? 3.2 : 1)));
    state.gold += goldDrop;
    state.scrap += scrapDrop;
    spawnExplosion(0.76, 0.52, battle.isBoss ? "#f43f5e" : "#fb923c", battle.isBoss ? 30 : 16);
    advanceContract("kills", 1);
    if (battle.isBoss) advanceContract("bosses", 1);

    if (state.subWave < 5) {
        state.subWave += 1;
    } else {
        state.subWave = 1;
        state.stage += 1;
        showToast(`Етап ${state.stage - 1} пройдено! Новий сектор неба.`, "success");
    }
    battle.playerHp = Math.min(battle.playerMaxHp, battle.playerHp + Math.round(battle.playerMaxHp * 0.15));
    spawnWaveEnemy();
    renderAllDynamicLists();
}

function updateSimulation(dt) {
    const stats = getPlayerStats();
    battle.playerMaxHp = stats.maxHp;
    const forgeStats = getForgeStats();
    state.craftProgress += dt * forgeStats.autoSpeed;
    if (state.craftProgress >= state.craftDuration) completeCraftCycle();

    if (battle.isRepairing) {
        battle.repairTimer -= dt;
        if (battle.repairTimer <= 0) {
            battle.isRepairing = false;
            battle.playerHp = battle.playerMaxHp;
            const overlay = document.getElementById("player-repair-overlay");
            if (overlay) overlay.classList.add("hidden");
            spawnWaveEnemy();
        }
    } else {
        battle.fireCooldown -= dt;
        if (battle.fireCooldown <= 0) {
            battle.fireCooldown = 1 / stats.fireRate;
            spawnProjectile(true, getCurrentPlane());
            const isCrit = Math.random() < 0.16;
            const dmg = isCrit ? Math.round(stats.atk * 1.8) : stats.atk;
            battle.enemyHp = Math.max(0, battle.enemyHp - dmg);
            triggerHitFlash("enemy-svg-container");
            showFloatingDamage("enemy-entity", dmg, isCrit, false);
            if (battle.enemyHp <= 0) handleEnemyDefeated();
        }

        battle.enemyAttackCooldown -= dt;
        if (battle.enemyAttackCooldown <= 0 && battle.enemyHp > 0) {
            battle.enemyAttackCooldown = 1.6;
            spawnProjectile(false, null);
            battle.playerHp = Math.max(0, battle.playerHp - battle.enemyAtk);
            triggerHitFlash("player-svg-container");
            showFloatingDamage("player-entity", battle.enemyAtk, false, true);
            if (battle.playerHp <= 0) {
                battle.isRepairing = true;
                battle.repairTimer = 2.5;
                spawnExplosion(0.24, 0.52, "#38bdf8", 20);
                const overlay = document.getElementById("player-repair-overlay");
                if (overlay) overlay.classList.remove("hidden");
            }
        }
    }
}

function renderCanvas(dt) {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clouds.forEach(c => {
        c.x -= c.speed * dt;
        if (c.x + c.w < 0) { c.x = canvas.width + 20; c.y = 20 + Math.random() * (canvas.height - 50); }
        ctx.fillStyle = `rgba(186, 230, 253, ${c.alpha})`;
        ctx.beginPath();
        ctx.roundRect(c.x, c.y, c.w, c.h, c.h / 2);
        ctx.fill();
    });

    for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
        p.x += p.vx * dt;
        ctx.save();
        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.isPlayer && state.currentPlaneId >= 4 ? 3.2 : 2.4;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - (p.isPlayer ? p.len : -p.len), p.y);
        ctx.stroke();
        ctx.restore();

        if ((p.isPlayer && p.x > canvas.width * 0.74) || (!p.isPlayer && p.x < canvas.width * 0.24)) {
            projectiles.splice(i, 1);
        }
    }

    for (let i = explosions.length - 1; i >= 0; i--) {
        const e = explosions[i];
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        e.life -= dt;
        if (e.life <= 0) { explosions.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, e.life / e.maxLife);
        ctx.fillStyle = e.color;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// Глобальні функції управління та взаємодії
window.equipPlane = function(planeId) {
    if (!state.unlockedPlanes.includes(planeId)) return;
    state.currentPlaneId = planeId;
    const stats = getPlayerStats();
    battle.playerMaxHp = stats.maxHp;
    battle.playerHp = stats.maxHp;
    renderPlayerPlane();
    renderEvolutionList();
    saveGame();
};

window.unlockPlane = function(planeId) {
    const plane = PLANES_DATA.find(p => p.id === planeId);
    if (!plane || state.unlockedPlanes.includes(planeId)) return;
    if (state.gold >= plane.unlockGold && state.scrap >= plane.unlockScrap) {
        state.gold -= plane.unlockGold;
        state.scrap -= plane.unlockScrap;
        state.unlockedPlanes.push(planeId);
        state.currentPlaneId = planeId;
        const stats = getPlayerStats();
        battle.playerMaxHp = stats.maxHp;
        battle.playerHp = stats.maxHp;
        spawnExplosion(0.25, 0.5, "#38bdf8", 25);
        showToast(`Новий літак зібрано: ${plane.name}!`, "success");
        renderPlayerPlane();
        renderAllDynamicLists();
        saveGame();
    }
};

window.buyUpgrade = function(upgId) {
    const config = UPGRADES_CONFIG.find(u => u.id === upgId);
    if (!config) return;
    const cost = getUpgradeCost(config);
    if (config.currency === "gold" && state.gold >= cost) {
        state.gold -= cost;
        state.upgrades[upgId] += 1;
    } else if (config.currency === "scrap" && state.scrap >= cost) {
        state.scrap -= cost;
        state.upgrades[upgId] += 1;
    } else return;
    if (upgId === "armor") {
        const stats = getPlayerStats();
        battle.playerMaxHp = stats.maxHp;
        battle.playerHp = stats.maxHp;
    }
    renderAllDynamicLists();
    saveGame();
};

window.claimContract = function(index) {
    const contract = state.contracts[index];
    if (!contract || contract.current < contract.target) return;
    state.gold += contract.rewardGold;
    state.scrap += contract.rewardScrap;
    showToast(`Контракт виконано! +${formatNumber(contract.rewardGold)} золота`, "gold");
    const tpl = CONTRACT_TEMPLATES[index % CONTRACT_TEMPLATES.length];
    const scale = Math.max(1, state.stage + (state.currentPlaneId - 1) * 2.5);
    state.contracts[index] = {
        uid: Date.now() + index,
        type: tpl.id,
        title: tpl.title,
        desc: tpl.desc,
        current: 0,
        target: tpl.id === "bosses" ? Math.max(1, Math.floor(1 + state.stage / 6)) : tpl.baseTarget + Math.floor(scale * 1.6),
        rewardGold: Math.floor(tpl.goldMult * Math.pow(1.5, scale)),
        rewardScrap: Math.max(3, Math.floor(tpl.scrapMult * Math.pow(1.34, scale)))
    };
    advanceContract("none", 0);
    renderAllDynamicLists();
    saveGame();
};

// Прив'язка подій інтерфейсу після завантаження DOM
document.addEventListener("DOMContentLoaded", () => {
    loadGame();
    resizeCanvas();
    initClouds();
    window.addEventListener("resize", resizeCanvas);

    const stats = getPlayerStats();
    battle.playerMaxHp = stats.maxHp;
    battle.playerHp = stats.maxHp;
    renderPlayerPlane();
    spawnWaveEnemy();
    advanceContract("none", 0);
    renderAllDynamicLists();

    // Кнопка прискорення збірки у цеху
    const forgeBtn = document.getElementById("btn-forge-tap");
    if (forgeBtn) {
        forgeBtn.addEventListener("click", (e) => {
            const forgeStats = getForgeStats();
            state.craftProgress += forgeStats.tapPower;
            advanceContract("taps", 1);

            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = (e.clientX || rect.left + rect.width / 2) - rect.left;
            const clickY = (e.clientY || rect.top + rect.height / 2) - rect.top;

            for (let i = 0; i < 7; i++) {
                const spark = document.createElement("span");
                spark.className = "spark-particle";
                spark.style.left = `${clickX}px`;
                spark.style.top = `${clickY}px`;
                spark.style.backgroundColor = i % 2 === 0 ? "#fef08a" : "#ffffff";
                const angle = Math.random() * Math.PI * 2;
                const dist = 25 + Math.random() * 45;
                spark.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
                spark.style.setProperty("--ty", `${Math.sin(angle) * dist}px`);
                e.currentTarget.appendChild(spark);
                setTimeout(() => spark.remove(), 500);
            }

            if (state.craftProgress >= state.craftDuration) completeCraftCycle();
            else renderContractsList();
        });
    }

    // Перемикання вкладок
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab");
            document.querySelectorAll(".tab-btn").forEach(b => {
                b.classList.remove("bg-cyan-500/20", "text-cyan-300", "border-cyan-500/40", "shadow-sm");
                b.classList.add("bg-slate-900/60", "text-slate-400", "border-slate-800");
            });
            btn.classList.remove("bg-slate-900/60", "text-slate-400", "border-slate-800");
            btn.classList.add("bg-cyan-500/20", "text-cyan-300", "border-cyan-500/40", "shadow-sm");
            document.querySelectorAll(".tab-content").forEach(c => c.classList.add("hidden"));
            const tabContentEl = document.getElementById(`tab-${targetTab}`);
            if (tabContentEl) tabContentEl.classList.remove("hidden");
        });
    });

    // Модальне вікно скидання прогресу
    const resetModal = document.getElementById("reset-modal");
    const btnResetModal = document.getElementById("btn-reset-modal");
    const btnResetCancel = document.getElementById("btn-reset-cancel");
    const btnResetConfirm = document.getElementById("btn-reset-confirm");

    if (btnResetModal && resetModal) {
        btnResetModal.addEventListener("click", () => resetModal.classList.remove("hidden"));
    }
    if (btnResetCancel && resetModal) {
        btnResetCancel.addEventListener("click", () => resetModal.classList.add("hidden"));
    }
    if (btnResetConfirm) {
        btnResetConfirm.addEventListener("click", () => {
            localStorage.removeItem(SAVE_KEY);
            location.reload();
        });
    }

    // Головний ігровий цикл
    let lastTimestamp = 0;
    let autoSaveTimer = 0;
    let listRefreshTimer = 0;

    function gameLoop(timestamp) {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const dt = Math.min(0.1, (timestamp - lastTimestamp) / 1000);
        lastTimestamp = timestamp;

        updateSimulation(dt);
        renderCanvas(dt);
        updateHudUI();

        listRefreshTimer += dt;
        if (listRefreshTimer >= 0.6) {
            listRefreshTimer = 0;
            renderAllDynamicLists();
        }

        autoSaveTimer += dt;
        if (autoSaveTimer >= 10) {
            autoSaveTimer = 0;
            saveGame();
        }
        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
});