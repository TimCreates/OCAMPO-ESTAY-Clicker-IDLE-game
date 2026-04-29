document.addEventListener("DOMContentLoaded", () => {

let gold = 0;
let goldPerClick = 1;
let goldPerSecond = 0;

let upgradeClickCost = 10;
let upgradeIdleCost = 25;

let gameStarted = false;

// Elements
const goldText = document.getElementById("gold");
const statsText = document.getElementById("stats");
const mineBtn = document.getElementById("mineBtn");
const bg = document.getElementById("bg");

const upgradeClickBtn = document.getElementById("upgradeClick");
const upgradeIdleBtn = document.getElementById("upgradeIdle");

const startBtn = document.getElementById("startBtn");
const menu = document.getElementById("menu");
const gameWrapper = document.getElementById("gameWrapper");

// ================= MAIN MENU =================
startBtn.onclick = () => {
    menu.style.display = "none";
    gameWrapper.style.display = "block";
    gameStarted = true;
    updateUI();
};

// ================= UI =================
function updateUI() {
    goldText.innerText = "Gold: " + gold;
    statsText.innerText =
        "Per Click: " + goldPerClick +
        " | Per Second: " + goldPerSecond;

    upgradeClickBtn.innerText = "Upgrade Pickaxe (" + upgradeClickCost + ")";
    upgradeIdleBtn.innerText = "Hire Miner (" + upgradeIdleCost + ")";
}

// ================= FLOAT TEXT =================
function createFloatingText(x, y, amount) {
    const text = document.createElement("div");
    text.className = "floating-text";
    text.innerText = "+" + amount;
    text.style.left = x + "px";
    text.style.top = y + "px";
    document.body.appendChild(text);
    setTimeout(() => text.remove(), 1000);
}

// ================= BACKGROUND EFFECTS =================
function spawnCoin() {
    const coin = document.createElement("div");
    coin.className = "coin";
    coin.innerText = "🪙";
    coin.style.left = Math.random() * 100 + "vw";
    coin.style.animationDuration = (3 + Math.random() * 5) + "s";
    bg.appendChild(coin);
    setTimeout(() => coin.remove(), 8000);
}

function spawnMiner() {
    const miner = document.createElement("div");
    miner.className = "miner";
    miner.innerText = "⛏️";
    miner.style.animationDuration = (5 + Math.random() * 5) + "s";
    bg.appendChild(miner);
    setTimeout(() => miner.remove(), 10000);
}

// ================= CLICK =================
mineBtn.onclick = (e) => {
    if (!gameStarted) return;

    gold += goldPerClick;
    updateUI();

    createFloatingText(e.clientX, e.clientY, goldPerClick);

    mineBtn.classList.add("mine-anim");
    setTimeout(() => mineBtn.classList.remove("mine-anim"), 100);

    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 300);

    goldText.classList.add("pop");
    setTimeout(() => goldText.classList.remove("pop"), 200);
};

// ================= UPGRADES =================
upgradeClickBtn.onclick = () => {
    if (!gameStarted) return;

    if (gold >= upgradeClickCost) {
        gold -= upgradeClickCost;
        goldPerClick++;
        upgradeClickCost *= 2;
        updateUI();

        goldText.classList.add("pop");
        setTimeout(() => goldText.classList.remove("pop"), 200);
    }
};

upgradeIdleBtn.onclick = () => {
    if (!gameStarted) return;

    if (gold >= upgradeIdleCost) {
        gold -= upgradeIdleCost;
        goldPerSecond++;
        upgradeIdleCost *= 2;
        updateUI();

        goldText.classList.add("pop");
        setTimeout(() => goldText.classList.remove("pop"), 200);
    }
};

// ================= GAME LOOPS =================
setInterval(() => {
    if (!gameStarted) return;

    if (goldPerSecond > 0) {
        gold += goldPerSecond;
        updateUI();
    }
}, 1000);

setInterval(() => {
    if (!gameStarted) return;
    spawnCoin();
}, 800);

setInterval(() => {
    if (!gameStarted) return;
    spawnMiner();
}, 3000);

// Initial UI
updateUI();

});