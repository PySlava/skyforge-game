/**
 * ============================================================================
 * FIREBASE CONFIG & AUTH MODULE
 * ============================================================================
 */

const firebaseConfig = {
    apiKey: "AIzaSyCn8-rCruSaMWE5HMXvaKGZdsiT0TQrS0g",
    authDomain: "skyforge-game.firebaseapp.com",
    projectId: "skyforge-game",
    storageBucket: "skyforge-game.firebasestorage.app",
    messagingSenderId: "92958955434",
    appId: "1:92958955434:web:a72a7b038e0c1e91e0bdd3",
    measurementId: "G-GQ00NYBXDB"
};

// Ініціалізація Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
let currentUserUid = null;
const googleProvider = new firebase.auth.GoogleAuthProvider();

window.loginWithGoogle = function() {
    if (currentUserUid) {
        auth.signOut();
    } else {
        auth.signInWithPopup(googleProvider).catch((err) => {
            console.warn("Помилка авторизації:", err);
        });
    }
};

auth.onAuthStateChanged((user) => {
    const authContainer = document.getElementById("auth-container");
    if (user) {
        currentUserUid = user.uid;
        authContainer.innerHTML = `
            <div class="flex items-center gap-2 bg-slate-800/90 border border-slate-700 px-2 py-1 rounded-xl">
                <img src="${user.photoURL || ''}" class="w-5 h-5 rounded-full object-cover" alt="avatar">
                <span class="text-xs font-bold text-slate-200 max-w-[80px] truncate">${user.displayName || 'Гравець'}</span>
                <button onclick="firebase.auth().signOut()" class="text-[10px] text-rose-400 hover:underline font-semibold ml-1">Вийти</button>
            </div>
        `;
        if (typeof showToast === 'function') {
            showToast(`Вітаємо, ${user.displayName || 'Командире'}!`, "success");
        }
        if (typeof loadGameFromCloud === 'function') {
            loadGameFromCloud();
        }
    } else {
        currentUserUid = null;
        authContainer.innerHTML = `
            <button id="btn-login" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors shadow-sm cursor-pointer">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.2v3.15C3.21 21.34 7.26 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.2C.44 8.14 0 9.87 0 12s.44 3.86 1.2 5.39l4.07-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.26 0 3.21 2.66 1.2 6.61l4.07 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
                <span>Увійти</span>
            </button>
        `;
        // Прив'язуємо подію кліку після оновлення DOM кнопкою
        document.getElementById("btn-login").addEventListener("click", loginWithGoogle);
    }
});

async function saveGameToCloud() {
    if (!currentUserUid || typeof state === 'undefined') return;
    try {
        await db.collection("players").doc(currentUserUid).set({
            ...state,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    } catch (err) {
        console.warn("Помилка збереження у хмару:", err);
    }
}

async function loadGameFromCloud() {
    if (!currentUserUid || typeof state === 'undefined') return;
    try {
        const doc = await db.collection("players").doc(currentUserUid).get();
        if (doc.exists) {
            const cloudData = doc.data();
            state = { ...state, ...cloudData };
            state.upgrades = { ...state.upgrades, ...(cloudData.upgrades || {}) };
            if (typeof getPlayerStats === 'function') {
                const stats = getPlayerStats();
                battle.playerMaxHp = stats.maxHp;
                battle.playerHp = stats.maxHp;
            }
            if (typeof renderPlayerPlane === 'function') renderPlayerPlane();
            if (typeof renderAllDynamicLists === 'function') renderAllDynamicLists();
            if (typeof showToast === 'function') showToast("Прогрес завантажено з хмари!", "success");
        } else {
            saveGameToCloud();
        }
    } catch (err) {
        console.warn("Помилка завантаження з хмари:", err);
    }
}