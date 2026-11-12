/**
 * ============================================================================
 * GAME CONSTANTS & DATA MODULE
 * ============================================================================
 */

const AIRCRAFT_SVGS = {
    // Ера 1: Sopwith Camel (1916)
    1: `
        <svg viewBox="0 0 220 110" class="w-full h-full">
            <defs>
                <linearGradient id="camelBody" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#655b52"/>
                    <stop offset="55%" stop-color="#443d35"/>
                    <stop offset="100%" stop-color="#c5bcaf"/>
                </linearGradient>
                <linearGradient id="camelWood" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#854d0e"/>
                    <stop offset="50%" stop-color="#b45309"/>
                    <stop offset="100%" stop-color="#451a03"/>
                </linearGradient>
                <radialGradient id="cowlMetal" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" stop-color="#e2e8f0"/>
                    <stop offset="60%" stop-color="#64748b"/>
                    <stop offset="100%" stop-color="#0f172a"/>
                </radialGradient>
            </defs>
            <ellipse cx="115" cy="94" rx="58" ry="4" fill="rgba(0,0,0,0.35)"/>
            <!-- Хвостове оперення та британський рондеве -->
            <path d="M20 50 L35 30 L48 33 L50 50 Z" fill="#443d35" stroke="#1c1917" stroke-width="1.2"/>
            <circle cx="34" cy="41" r="7" fill="#1e293b"/>
            <circle cx="34" cy="41" r="4.8" fill="#dc2626"/>
            <circle cx="34" cy="41" r="2" fill="#f8fafc"/>
            <!-- Фюзеляж та дерев'яний кокпіт -->
            <path d="M24 50 L115 44 L165 44 L168 62 L115 64 L26 56 Z" fill="url(#camelBody)" stroke="#1c1917" stroke-width="1.3"/>
            <path d="M110 44 L156 44 L156 62 L110 63 Z" fill="url(#camelWood)" stroke="#451a03" stroke-width="1"/>
            <line x1="110" y1="44" x2="110" y2="63" stroke="#1c1917" stroke-width="1"/>
            <!-- Пілот у шоломі -->
            <circle cx="84" cy="53" r="7.5" fill="#292524"/>
            <circle cx="85" cy="52" r="5.2" fill="#9a3412"/>
            <rect x="83" y="50.5" width="4" height="2.5" rx="1" fill="#38bdf8" stroke="#0f172a" stroke-width="0.5"/>
            <!-- Кулемети Вікерса зверху капота -->
            <rect x="115" y="40" width="26" height="3.2" rx="1" fill="#1e293b" stroke="#0f172a" stroke-width="0.8"/>
            <line x1="141" y1="41.6" x2="156" y2="41.6" stroke="#475569" stroke-width="1.5"/>
            <!-- Стійки біпланної коробки та розтяжки -->
            <line x1="104" y1="28" x2="102" y2="61" stroke="#451a03" stroke-width="2.2"/>
            <line x1="142" y1="28" x2="140" y2="61" stroke="#451a03" stroke-width="2.2"/>
            <line x1="104" y1="29" x2="140" y2="60" stroke="#cbd5e1" stroke-width="0.6" opacity="0.7"/>
            <line x1="142" y1="29" x2="102" y2="60" stroke="#cbd5e1" stroke-width="0.6" opacity="0.7"/>
            <!-- Верхнє крило -->
            <path d="M92 24 L160 24 L156 29 L89 29 Z" fill="#443d35" stroke="#1c1917" stroke-width="1.3"/>
            <!-- Капот ротаційного двигуна та анімований гвинт -->
            <path d="M156 42 L170 43 Q175 53 170 63 L156 64 Z" fill="url(#cowlMetal)" stroke="#0f172a" stroke-width="1.3"/>
            <ellipse cx="176" cy="53" rx="2.2" ry="28" fill="rgba(217, 119, 6, 0.4)" stroke="rgba(254, 243, 199, 0.6)" stroke-width="0.8">
                <animate attributeName="ry" values="28;5;28" dur="0.08s" repeatCount="indefinite"/>
            </ellipse>
        </svg>
    `,

    // Ера 2: Supermarine Spitfire Mk.V
    2: `
        <svg viewBox="0 0 220 110" class="w-full h-full">
            <defs>
                <linearGradient id="spitCamo" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#365314"/>
                    <stop offset="45%" stop-color="#4d7c0f"/>
                    <stop offset="100%" stop-color="#78350f"/>
                </linearGradient>
                <linearGradient id="spitBelly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#64748b"/>
                    <stop offset="100%" stop-color="#cbd5e1"/>
                </linearGradient>
                <linearGradient id="canopyGlass" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#bae6fd"/>
                    <stop offset="50%" stop-color="#0284c7"/>
                    <stop offset="100%" stop-color="#0f172a"/>
                </linearGradient>
            </defs>
            <!-- Хвостове оперіння та британська кокарда -->
            <path d="M14 49 Q20 26 36 29 Q44 31 46 49 Z" fill="#365314" stroke="#1a2e05" stroke-width="1.3"/>
            <circle cx="32" cy="40" r="6" fill="#1d4ed8"/>
            <circle cx="32" cy="40" r="3.8" fill="#ffffff"/>
            <circle cx="32" cy="40" r="1.6" fill="#dc2626"/>
            <!-- Еліптичний профіль крила та камуфляжний фюзеляж -->
            <path d="M22 50 Q75 40 176 44 L178 58 Q115 68 24 56 Z" fill="url(#spitCamo)" stroke="#1a2e05" stroke-width="1.4"/>
            <path d="M24 55 Q105 65 177 57 L176 60 Q105 69 24 57 Z" fill="url(#spitBelly)"/>
            <!-- Кабіна пілота (краплеподібний ліхтар) -->
            <path d="M84 44 Q102 28 126 44 Z" fill="url(#canopyGlass)" stroke="#1e293b" stroke-width="1.3"/>
            <line x1="101" y1="32" x2="101" y2="44" stroke="#1e293b" stroke-width="1.2"/>
            <!-- Гармати Hispano 20мм у консолях крил -->
            <rect x="135" y="47" width="22" height="2" fill="#1e293b"/>
            <!-- Трилопатевий гвинт Мерлін -->
            <path d="M176 43 L196 51 L176 59 Z" fill="#0f172a" stroke="#334155" stroke-width="1.2"/>
            <ellipse cx="187" cy="51" rx="2.5" ry="32" fill="rgba(226, 232, 240, 0.45)" stroke="rgba(255, 255, 255, 0.7)" stroke-width="0.8">
                <animate attributeName="ry" values="32;6;32" dur="0.06s" repeatCount="indefinite"/>
            </ellipse>
        </svg>
    `,

    // Ера 3: F-86F Sabre (1950)
    3: `
        <svg viewBox="0 0 220 110" class="w-full h-full">
            <defs>
                <linearGradient id="sabreAlum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="35%" stop-color="#cbd5e1"/>
                    <stop offset="70%" stop-color="#64748b"/>
                    <stop offset="100%" stop-color="#94a3b8"/>
                </linearGradient>
                <linearGradient id="sabreJet" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%" stop-color="#fb923c"/>
                    <stop offset="50%" stop-color="#ef4444" stop-opacity="0.8"/>
                    <stop offset="100%" stop-color="#ef4444" stop-opacity="0"/>
                </linearGradient>
            </defs>
            <!-- Реактивний розжарений слід -->
            <path d="M26 48 L2 52 L26 56 Z" fill="url(#sabreJet)">
                <animate attributeName="d" values="M26 48 L2 52 L26 56 Z;M26 46 L8 52 L26 58 Z;M26 48 L2 52 L26 56 Z" dur="0.09s" repeatCount="indefinite"/>
            </path>
            <!-- Стрілоподібний кiль -->
            <path d="M30 45 L12 16 L34 16 L54 45 Z" fill="url(#sabreAlum)" stroke="#334155" stroke-width="1.3"/>
            <!-- Фюзеляж з круглим носовим повітрозабірником -->
            <path d="M26 45 L184 44 Q193 52 184 61 L26 58 Z" fill="url(#sabreAlum)" stroke="#334155" stroke-width="1.4"/>
            <ellipse cx="186" cy="52.5" rx="3.2" ry="8" fill="#0f172a" stroke="#475569" stroke-width="1.2"/>
            <!-- Вигнутий ліхтар кабіни -->
            <path d="M100 44 Q125 26 152 44 Z" fill="#bae6fd" opacity="0.9" stroke="#334155" stroke-width="1.3"/>
            <!-- Стрілоподібні крила та кулемети Браунінг -->
            <path d="M96 54 L138 54 L110 77 L76 75 Z" fill="#cbd5e1" stroke="#334155" stroke-width="1.4"/>
            <circle cx="164" cy="49" r="1.3" fill="#0f172a"/>
            <circle cx="168" cy="51.5" r="1.3" fill="#0f172a"/>
            <circle cx="164" cy="54" r="1.3" fill="#0f172a"/>
        </svg>
    `,

    // Ера 4: F-16C Fighting Falcon
    4: `
        <svg viewBox="0 0 220 110" class="w-full h-full">
            <defs>
                <linearGradient id="f16Grey" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#475569"/>
                    <stop offset="50%" stop-color="#64748b"/>
                    <stop offset="100%" stop-color="#94a3b8"/>
                </linearGradient>
                <linearGradient id="f16Afterburner" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%" stop-color="#e0f2fe"/>
                    <stop offset="30%" stop-color="#38bdf8"/>
                    <stop offset="70%" stop-color="#f97316"/>
                    <stop offset="100%" stop-color="#f97316" stop-opacity="0"/>
                </linearGradient>
                <linearGradient id="goldCanopy" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#fef08a"/>
                    <stop offset="45%" stop-color="#d97706"/>
                    <stop offset="100%" stop-color="#1e293b"/>
                </linearGradient>
            </defs>
            <!-- Форсажний інтенсивний слід -->
            <path d="M28 46 L0 51 L28 56 Z" fill="url(#f16Afterburner)">
                <animate attributeName="opacity" values="1;0.6;1" dur="0.08s" repeatCount="indefinite"/>
            </path>
            <!-- Кіль та підкілевий гребінь -->
            <path d="M38 44 L20 10 L44 10 L64 44 Z" fill="#475569" stroke="#1e293b" stroke-width="1.3"/>
            <path d="M44 58 L35 68 L58 58 Z" fill="#475569" stroke="#1e293b" stroke-width="1"/>
            <!-- Блакитно-сірий планер із нижнім повітрозабірником -->
            <path d="M38 44 L145 43 L208 52 L145 59 L38 58 Z" fill="url(#f16Grey)" stroke="#1e293b" stroke-width="1.4"/>
            <!-- Золотавий ліхтар кабіни -->
            <path d="M106 44 Q134 26 166 44 Z" fill="url(#goldCanopy)" stroke="#1e293b" stroke-width="1.3"/>
            <!-- Крила та ракети AMRAAM на законцівках -->
            <path d="M72 51 L138 51 L98 76 L66 74 Z" fill="#64748b" stroke="#1e293b" stroke-width="1.4"/>
            <rect x="76" y="61" width="42" height="2.8" rx="1" fill="#e2e8f0" stroke="#334155" stroke-width="0.7"/>
        </svg>
    `,

    // Ера 5: F-22A Raptor (Stealth)
    5: `
        <svg viewBox="0 0 220 110" class="w-full h-full">
            <defs>
                <linearGradient id="raptorStealth" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#1e293b"/>
                    <stop offset="45%" stop-color="#334155"/>
                    <stop offset="75%" stop-color="#0f172a"/>
                    <stop offset="100%" stop-color="#475569"/>
                </linearGradient>
                <linearGradient id="raptorPlasma" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%" stop-color="#cffafe"/>
                    <stop offset="40%" stop-color="#06b6d4"/>
                    <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
                </linearGradient>
            </defs>
            <!-- Блакитний плазмовий прихований слід -->
            <path d="M30 46 L2 51 L30 56 Z" fill="url(#raptorPlasma)"/>
            <!-- Нахилені трапецієподібні вертикальні стабілізатори -->
            <path d="M44 45 L24 15 L48 15 L76 45 Z" fill="#1e293b" stroke="#64748b" stroke-width="1.2"/>
            <!-- Стелс-фюзеляж із суворими паралельними кутами -->
            <path d="M40 45 L138 41 L210 51 L138 60 L40 57 Z" fill="url(#raptorStealth)" stroke="#64748b" stroke-width="1.3"/>
            <!-- Гідролокаційно-захищений ліхтар кабіни -->
            <path d="M112 43 Q142 27 172 43 Z" fill="#f59e0b" stroke="#94a3b8" stroke-width="1.2"/>
            <!-- Ромбоподібні крила 5-го покоління -->
            <path d="M66 51 L142 51 L102 77 L62 71 Z" fill="#1e293b" stroke="#94a3b8" stroke-width="1.3"/>
        </svg>
    `,

    // Ера 6: B-2 Spirit (1997)
    6: `
        <svg viewBox="0 0 220 110" class="w-full h-full">
            <defs>
                <linearGradient id="b2Stealth" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#0f172a"/>
                    <stop offset="50%" stop-color="#1e293b"/>
                    <stop offset="100%" stop-color="#020617"/>
                </linearGradient>
            </defs>
            <!-- Пилкоподібне стелс-крило (літаюче крило) -->
            <path d="M26 54 L44 45 L58 51 L72 43 L88 50 L102 42 L202 54 L112 73 L94 64 L78 73 L60 63 L44 70 Z" fill="url(#b2Stealth)" stroke="#64748b" stroke-width="1.3"/>
            <!-- Кабіна бомбардувальника із заломленням променів РЛС -->
            <path d="M148 48 L176 52 L170 56 L144 54 Z" fill="#38bdf8" opacity="0.8" stroke="#94a3b8" stroke-width="0.8"/>
            <!-- Центральний відсік важкого озброєння -->
            <rect x="92" y="65" width="36" height="5" rx="2" fill="#475569" stroke="#94a3b8" stroke-width="0.8"/>
        </svg>
    `,

    // Ера 7: SR-71 Blackbird (1966)
    7: `
        <svg viewBox="0 0 220 110" class="w-full h-full">
            <defs>
                <linearGradient id="sr71Body" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#1e1b4b"/>
                    <stop offset="45%" stop-color="#0f172a"/>
                    <stop offset="100%" stop-color="#020617"/>
                </linearGradient>
            </defs>
            <!-- Фіалковий форсажний слід на висоті 25+ км -->
            <path d="M36 52 L2 58 L36 64 Z" fill="#818cf8">
                <animate attributeName="opacity" values="0.9;0.5;0.9" dur="0.1s" repeatCount="indefinite"/>
            </path>
            <!-- Нахилені кілі на мотогондолах -->
            <path d="M52 51 L40 23 L58 23 L78 51 Z" fill="#0f172a" stroke="#475569" stroke-width="1.2"/>
            <!-- Титановий голчастий фюзеляж з напливами -->
            <path d="M32 48 L154 46 L216 53 L154 58 L32 56 Z" fill="url(#sr71Body)" stroke="#475569" stroke-width="1.3"/>
            <!-- Кабіна пілота та оператора -->
            <path d="M136 46 L154 40 L170 46 Z" fill="#38bdf8" opacity="0.75"/>
            <path d="M156 46 L169 41 L180 47 Z" fill="#38bdf8" opacity="0.75"/>
            <!-- Масивні обтічники двигунів J58 -->
            <path d="M34 51 L118 51 L128 58 L118 65 L34 64 Z" fill="#090d16" stroke="#64748b" stroke-width="1.3"/>
        </svg>
    `,

    // Ера 8: X-02S Strike Wyvern (2028)
    8: `
        <svg viewBox="0 0 220 110" class="w-full h-full">
            <defs>
                <linearGradient id="wyvernHull" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#1e3a8a"/>
                    <stop offset="50%" stop-color="#1e293b"/>
                    <stop offset="100%" stop-color="#0f172a"/>
                </linearGradient>
            </defs>
            <!-- Плазмовий фіолетовий імпульсний вихлоп -->
            <path d="M28 46 L0 51 L28 56 Z" fill="#c026d3">
                <animate attributeName="opacity" values="1;0.4;1" dur="0.07s" repeatCount="indefinite"/>
            </path>
            <!-- Подвійний V-подібний хвіст -->
            <path d="M44 45 L22 17 L46 19 L74 45 Z" fill="#1e293b" stroke="#60a5fa" stroke-width="1.2"/>
            <!-- Футуристичний планер -->
            <path d="M38 45 L146 41 L212 51 L146 60 L38 57 Z" fill="url(#wyvernHull)" stroke="#60a5fa" stroke-width="1.3"/>
            <!-- Закрита кабіна COFFIN (без вікон, на сенсорах) -->
            <path d="M112 43 Q142 28 170 43 Z" fill="#090d16" stroke="#38bdf8" stroke-width="1.3"/>
            <!-- Крила зворотної стрілоподібності -->
            <path d="M62 52 L114 52 L140 78 L104 78 Z" fill="#1d4ed8" stroke="#93c5fd" stroke-width="1.3"/>
        </svg>
    `,

    // Ера 9: TR-3B Astra / Aurora (2035)
    9: `
        <svg viewBox="0 0 220 110" class="w-full h-full">
            <defs>
                <radialGradient id="mhdCore" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="35%" stop-color="#2dd4bf"/>
                    <stop offset="70%" stop-color="#0284c7" stop-opacity="0.8"/>
                    <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
                </radialGradient>
            </defs>
            <!-- Бірюзовий іонний слід -->
            <path d="M40 44 L2 52 L40 60 Z" fill="#2dd4bf" opacity="0.85">
                <animate attributeName="opacity" values="0.9;0.4;0.9" dur="0.1s" repeatCount="indefinite"/>
            </path>
            <!-- Аерокосмічна трикутна платформа TR-3B -->
            <path d="M34 26 L208 52 L34 78 L54 52 Z" fill="#090d16" stroke="#2dd4bf" stroke-width="1.5"/>
            <!-- Центральний пульсуючий МГД-прискорювач плазми -->
            <circle cx="96" cy="52" r="16" fill="url(#mhdCore)">
                <animate attributeName="r" values="14;18;14" dur="0.4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="96" cy="52" r="7" fill="#ccfbf1" stroke="#14b8a6" stroke-width="1.5"/>
            <!-- Кутові потужні генератори гравітаційного поля -->
            <circle cx="42" cy="31" r="4.2" fill="#2dd4bf" stroke="#ffffff" stroke-width="1"/>
            <circle cx="42" cy="73" r="4.2" fill="#2dd4bf" stroke="#ffffff" stroke-width="1"/>
        </svg>
        `,

    // Ера 10: X-99 Valkyrie (2050) — Орбітальний перехоплювач із рейкотроном
    10: `
        <svg viewBox="0 0 220 110" class="w-full h-full">
            <defs>
                <linearGradient id="valkArmor" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#f8fafc"/>
                    <stop offset="40%" stop-color="#cbd5e1"/>
                    <stop offset="80%" stop-color="#334155"/>
                    <stop offset="100%" stop-color="#0f172a"/>
                </linearGradient>
            </defs>
            <!-- Енергетичний щит носа -->
            <path d="M168 24 Q224 52 168 80" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6 3" opacity="0.8"/>
            <!-- Термоядерний факел двигуна -->
            <path d="M26 44 L0 51 L26 58 Z" fill="#38bdf8"/>
            <!-- Корпус Valkyrie -->
            <path d="M28 44 L144 38 L212 51 L144 63 L28 58 Z" fill="url(#valkArmor)" stroke="#475569" stroke-width="1.4"/>
            <!-- Підвісна рейкотронна гармата -->
            <path d="M66 54 L138 54 L106 82 L60 76 Z" fill="#0f172a" stroke="#38bdf8" stroke-width="1.4"/>
            <circle cx="162" cy="69" r="3.5" fill="#38bdf8"/>
        </svg>
    `
};

const ENEMY_SVGS = {
    // Ворожий розвідувальний БПЛА (малий, маневрений)
    drone: `
        <svg viewBox="0 0 180 100" class="w-full h-full">
            <defs>
                <linearGradient id="enemyDark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#334155"/>
                    <stop offset="100%" stop-color="#0f172a"/>
                </linearGradient>
            </defs>
            <path d="M158 46 L178 49 L158 52 Z" fill="#ef4444" opacity="0.7"/>
            <path d="M148 45 L162 24 L136 45 Z" fill="#7f1d1d" stroke="#450a0a" stroke-width="1.2"/>
            <path d="M156 45 L58 42 L18 50 L58 56 L156 53 Z" fill="url(#enemyDark)" stroke="#ef4444" stroke-width="1.2"/>
            <circle cx="44" cy="56" r="5" fill="#1e293b" stroke="#ef4444" stroke-width="1"/>
            <circle cx="42" cy="56" r="2" fill="#f43f5e"/>
            <path d="M74 49 L116 49 L126 70 L94 69 Z" fill="#1e293b" stroke="#475569" stroke-width="1.3"/>
            <rect x="82" y="64" width="24" height="3.5" rx="1.5" fill="#dc2626"/>
        </svg>
    `,

    // Ворожий реактивний перехоплювач (агресивний червоний силует)
    interceptor: `
        <svg viewBox="0 0 190 105" class="w-full h-full">
            <defs>
                <linearGradient id="migRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#7f1d1d"/>
                    <stop offset="50%" stop-color="#991b1b"/>
                    <stop offset="100%" stop-color="#450a0a"/>
                </linearGradient>
            </defs>
            <path d="M164 46 L188 51 L164 56 Z" fill="#f97316"/>
            <path d="M156 44 L168 18 L142 44 Z" fill="#7f1d1d" stroke="#450a0a" stroke-width="1.3"/>
            <path d="M162 44 L66 42 L14 51 L66 58 L162 56 Z" fill="url(#migRed)" stroke="#450a0a" stroke-width="1.4"/>
            <path d="M52 43 Q74 31 96 43 Z" fill="#1e293b" stroke="#f87171" stroke-width="1"/>
            <path d="M74 51 L134 51 L148 73 L104 71 Z" fill="#b91c1c" stroke="#450a0a" stroke-width="1.4"/>
            <rect x="88" y="68" width="32" height="3" rx="1" fill="#f8fafc"/>
        </svg>
    `,

    // Важкий стратосферний крейсер
    cruiser: `
        <svg viewBox="0 0 210 115" class="w-full h-full">
            <defs>
                <linearGradient id="cruiserHull" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#312e81"/>
                    <stop offset="50%" stop-color="#1e1b4b"/>
                    <stop offset="100%" stop-color="#090d16"/>
                </linearGradient>
            </defs>
            <path d="M180 42 L208 48 L180 54 Z" fill="#a855f7"/>
            <path d="M180 56 L208 62 L180 68 Z" fill="#ec4899"/>
            <path d="M174 42 L188 16 L148 42 Z" fill="#4c1d95" stroke="#a855f7" stroke-width="1.4"/>
            <path d="M184 42 L64 38 L12 54 L64 70 L184 65 Z" fill="url(#cruiserHull)" stroke="#c084fc" stroke-width="1.5"/>
            <rect x="74" y="45" width="76" height="18" rx="3" fill="#1e1b4b" stroke="#e879f9" stroke-width="1"/>
            <circle cx="92" cy="54" r="3.5" fill="#f43f5e"/>
            <circle cx="112" cy="54" r="3.5" fill="#f43f5e"/>
            <circle cx="132" cy="54" r="3.5" fill="#f43f5e"/>
            <path d="M78 58 L148 58 L166 86 L104 82 Z" fill="#3b0764" stroke="#a855f7" stroke-width="1.5"/>
        </svg>
    `,

    // Повітряна фортеця / Бос (масивний важкий флагман)
    boss: `
        <svg viewBox="0 0 220 120" class="w-full h-full">
            <defs>
                <linearGradient id="bossArmor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#4c0519"/>
                    <stop offset="50%" stop-color="#881337"/>
                    <stop offset="100%" stop-color="#1e1b4b"/>
                </linearGradient>
            </defs>
            <path d="M190 42 L218 47 L190 52 Z" fill="#f43f5e"/>
            <path d="M190 54 L218 59 L190 64 Z" fill="#fb923c"/>
            <path d="M186 42 L198 12 L156 42 Z" fill="#881337" stroke="#4c0519" stroke-width="2"/>
            <path d="M192 42 L62 36 L14 54 L62 72 L192 64 Z" fill="url(#bossArmor)" stroke="#f43f5e" stroke-width="1.6"/>
            <rect x="76" y="42" width="78" height="22" rx="4" fill="#31102f" stroke="#fb7185" stroke-width="1"/>
            <path d="M84 58 L158 58 L178 90 L114 86 Z" fill="#9f1239" stroke="#4c0519" stroke-width="1.8"/>
        </svg>
    `,

    // Орбітальний Дредноут (Фінальний бос високих хвиль)
    dreadnought: `
        <svg viewBox="0 0 225 125" class="w-full h-full">
            <defs>
                <linearGradient id="dreadHull" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#090d16"/>
                    <stop offset="50%" stop-color="#1e1b4b"/>
                    <stop offset="100%" stop-color="#450a0a"/>
                </linearGradient>
            </defs>
            <path d="M195 38 L222 44 L195 50 Z" fill="#38bdf8"/>
            <path d="M195 54 L222 60 L195 66 Z" fill="#f43f5e"/>
            <path d="M195 70 L222 76 L195 82 Z" fill="#38bdf8"/>
            <path d="M198 38 L66 30 L10 56 L66 82 L198 74 Z" fill="url(#dreadHull)" stroke="#f43f5e" stroke-width="1.8"/>
            <polygon points="74,44 156,44 168,56 156,68 74,68 62,56" fill="#0f172a" stroke="#38bdf8" stroke-width="1.2"/>
            <circle cx="114" cy="56" r="8" fill="#f43f5e"/>
            <path d="M84 68 L164 68 L186 102 L114 96 Z" fill="#1e1b4b" stroke="#f43f5e" stroke-width="1.8"/>
        </svg>
    `
};

const PLANES_DATA = [
    { id: 1, name: "Sopwith Camel (1916)", era: "Ера I", subtitle: "Біплан ПСВ · 2× кулемети Vickers", baseAtk: 10, baseHp: 100, fireRate: 1.2, unlockGold: 0, unlockScrap: 0, bulletColor: "#fbbf24", projectileType: "bullet" },
    { id: 2, name: "Supermarine Spitfire Mk.V", era: "Ера II", subtitle: "Винищувач ДСВ · Гармати Hispano 20мм", baseAtk: 35, baseHp: 320, fireRate: 1.6, unlockGold: 350, unlockScrap: 15, bulletColor: "#a3e635", projectileType: "bullet" },
    { id: 3, name: "F-86F Sabre (1950)", era: "Ера III", subtitle: "Реактивний винищувач · 6× M3 Browning", baseAtk: 125, baseHp: 1100, fireRate: 2.1, unlockGold: 2200, unlockScrap: 75, bulletColor: "#38bdf8", projectileType: "tracer" },
    { id: 4, name: "F-16C Fighting Falcon", era: "Ера IV", subtitle: "Покоління 4 · Ракети AIM-120 AMRAAM", baseAtk: 480, baseHp: 4200, fireRate: 2.6, unlockGold: 14000, unlockScrap: 320, bulletColor: "#f97316", projectileType: "missile" },
    { id: 5, name: "F-22A Raptor (Stealth)", era: "Ера V", subtitle: "Покоління 5 · Малопомітний перехоплювач", baseAtk: 2100, baseHp: 18000, fireRate: 3.3, unlockGold: 85000, unlockScrap: 1400, bulletColor: "#22d3ee", projectileType: "missile" },
    { id: 6, name: "B-2 Spirit (1997)", era: "Ера VI", subtitle: "Стелс-бомбардувальник · Важкі керовані бомби", baseAtk: 9800, baseHp: 82000, fireRate: 3.6, unlockGold: 520000, unlockScrap: 6200, bulletColor: "#f59e0b", projectileType: "bomb" },
    { id: 7, name: "SR-71 Blackbird (1966)", era: "Ера VII", subtitle: "Надзвуковий розвідник · Імпульсні ракети Мах 3+", baseAtk: 44000, baseHp: 350000, fireRate: 4.2, unlockGold: 3200000, unlockScrap: 28000, bulletColor: "#818cf8", projectileType: "mach" },
    { id: 8, name: "X-02S Strike Wyvern (2028)", era: "Ера VIII", subtitle: "Покоління 5++ · Плазмово-імпульсні заряди", baseAtk: 210000, baseHp: 1550000, fireRate: 4.8, unlockGold: 21000000, unlockScrap: 130000, bulletColor: "#e879f9", projectileType: "plasma" },
    { id: 9, name: "TR-3B Astra / Aurora (2035)", era: "Ера IX", subtitle: "Гіперзвуковий МГД-апарат · Іонні промені", baseAtk: 1050000, baseHp: 7200000, fireRate: 5.4, unlockGold: 145000000, unlockScrap: 650000, bulletColor: "#2dd4bf", projectileType: "beam" },
    { id: 10, name: "X-99 Valkyrie (2050)", era: "Ера X", subtitle: "Орбітальний перехоплювач · Рейкотронна гармата", baseAtk: 5600000, baseHp: 36000000, fireRate: 6.2, unlockGold: 1100000000, unlockScrap: 3500000, bulletColor: "#38bdf8", projectileType: "railgun" }
];

const UPGRADES_CONFIG = [
    { id: "weapons", name: "Авіаційні Гармати та Ракети", desc: "Підвищує шкоду (ATK) на +22% за рівень", baseCost: 25, costMult: 1.42, currency: "gold", iconColor: "text-rose-400 bg-rose-500/15 border-rose-500/30" },
    { id: "armor", name: "Титанова та Композитна Броня", desc: "Підвищує броню (HP) на +26% та авто-ремонт", baseCost: 20, costMult: 1.4, currency: "gold", iconColor: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30" },
    { id: "tools", name: "Інструменти та Дрони Інженерів", desc: "Прискорює авто-збірку та силу кліку у цеху", baseCost: 10, costMult: 1.5, currency: "scrap", iconColor: "text-amber-400 bg-amber-500/15 border-amber-500/30" },
    { id: "logistics", name: "Трофейні Конвої та Розвідка", desc: "Збільшує здобич Золота та Деталей на +28%", baseCost: 45, costMult: 1.55, currency: "gold", iconColor: "text-cyan-400 bg-cyan-500/15 border-cyan-500/30" }
];

const CONTRACT_TEMPLATES = [
    { id: "kills", title: "Зачистка неба", desc: "Збити ворожих апаратів", baseTarget: 8, goldMult: 75, scrapMult: 5 },
    { id: "taps", title: "Ударна зміна", desc: "Зробити кліків прискорення в цеху", baseTarget: 15, goldMult: 65, scrapMult: 6 },
    { id: "crafts", title: "Серійне виробництво", desc: "Завершити циклів збірки у цеху", baseTarget: 2, goldMult: 105, scrapMult: 9 },
    { id: "bosses", title: "Полювання на флагманів", desc: "Знищити повітряних босів", baseTarget: 1, goldMult: 180, scrapMult: 15 }
];

const SAVE_KEY = "skyforge_aviation_idle_v2";

let state = {
    gold: 40,
    scrap: 5,
    currentPlaneId: 1,
    unlockedPlanes: [1],
    upgrades: { weapons: 0, armor: 0, tools: 0, logistics: 0 },
    craftLevel: 1,
    craftProgress: 0,
    craftDuration: 8.0,
    stage: 1,
    subWave: 1,
    contracts: []
};

let battle = {
    playerHp: 100,
    playerMaxHp: 100,
    isRepairing: false,
    repairTimer: 0,
    fireCooldown: 0,
    enemyName: "Ударний БПЛА",
    enemyType: "drone",
    enemyHp: 45,
    enemyMaxHp: 45,
    enemyAtk: 6,
    enemyAttackCooldown: 1.5,
    isBoss: false
};