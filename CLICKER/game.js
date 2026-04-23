document.addEventListener("DOMContentLoaded", () => {

let gold = 0;
let goldPerClick = 1;
let goldPerSecond = 0;

let upgradeClickCost = 10;
let upgradeIdleCost = 25;

const goldText = document.getElementById("gold");
const statsText = document.getElementById("stats");
const mineBtn = document.getElementById("mineBtn");
const bg = document.getElementById("bg");

const upgradeClickBtn = document.getElementById("upgradeClick");
const upgradeIdleBtn = document.getElementById("upgradeIdle");

// Update UI
function updateUI() {
    goldText.innerText = "Gold: " + gold;
    statsText.innerText =
        "Per Click: " + goldPerClick +
        " | Per Second: " + goldPerSecond;

    upgradeClickBtn.innerText = "Upgrade Pickaxe (" + upgradeClickCost + ")";
    upgradeIdleBtn.innerText = "Hire Miner (" + upgradeIdleCost + ")";
}

// Floating text
function createFloatingText(x, y, amount) {
    const text = document.createElement("div");
    text.className = "floating-text";
    text.innerText = "+" + amount;
    text.style.left = x + "px";
    text.style.top = y + "px";
    document.body.appendChild(text);
    setTimeout(() => text.remove(), 1000);
}

// Coins
function spawnCoin() {
    const coin = document.createElement("div");
    coin.className = "coin";
    coin.innerText = "🪙";
    coin.style.left = Math.random() * 100 + "vw";
    coin.style.animationDuration = (3 + Math.random() * 5) + "s";
    bg.appendChild(coin);
    setTimeout(() => coin.remove(), 8000);
}

// Miners
function spawnMiner() {
    const miner = document.createElement("div");
    miner.className = "miner";
    miner.innerText = "⛏️";
    miner.style.animationDuration = (5 + Math.random() * 5) + "s";
    bg.appendChild(miner);
    setTimeout(() => miner.remove(), 10000);
}

// CLICK
mineBtn.onclick = (e) => {
    gold += goldPerClick;
    updateUI();

    createFloatingText(e.clientX, e.clientY, goldPerClick);

    // animations
    mineBtn.classList.add("mine-anim");
    setTimeout(() => mineBtn.classList.remove("mine-anim"), 100);

    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 300);

    goldText.classList.add("pop");
    setTimeout(() => goldText.classList.remove("pop"), 200);
};

// Upgrades
upgradeClickBtn.onclick = () => {
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
    if (gold >= upgradeIdleCost) {
        gold -= upgradeIdleCost;
        goldPerSecond++;
        upgradeIdleCost *= 2;
        updateUI();

        goldText.classList.add("pop");
        setTimeout(() => goldText.classList.remove("pop"), 200);
    }
};

// Idle income
setInterval(() => {
    if (goldPerSecond > 0) {
        gold += goldPerSecond;
        updateUI();
    }
}, 1000);

// Background effects
setInterval(spawnCoin, 800);
setInterval(spawnMiner, 3000);

updateUI();

});