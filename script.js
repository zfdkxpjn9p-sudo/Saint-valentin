const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const question = document.getElementById("question-container");
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const funnyText = document.getElementById("funny-text");

let yesScale = 1;
let noScale = 1;
let attempts = 0;

// 1️⃣ Position initiale des boutons visibles
function placeInitialButtons() {
  yesBtn.style.left = "20%";
  yesBtn.style.top = "50%";
  noBtn.style.left = "70%";
  noBtn.style.top = "50%";
}

placeInitialButtons();

// 2️⃣ Fonction pour déplacer le NON aléatoirement en évitant OUI
function moveNo() {
  attempts++;
  sound.currentTime = 0;
  sound.play();

  // Rétrécir le bouton NON
  noScale = Math.max(0.3, noScale - 0.05);
  noBtn.style.transform = `scale(${noScale})`;

  // Éviter que NON passe sur OUI
  const yesRect = yesBtn.getBoundingClientRect();
  let x, y;

  do {
    x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  } while (
    x + noBtn.offsetWidth > yesRect.left &&
    x < yesRect.right &&
    y + noBtn.offsetHeight > yesRect.top &&
    y < yesRect.bottom
  );

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  // Message drôle après 5 tentatives
  if (attempts > 5) funnyText.classList.remove("hidden");

  // OUI plein écran après 8 tentatives
  if (attempts > 8) {
    yesBtn.style.position = "fixed";
    yesBtn.style.top = 0;
    yesBtn.style.left = 0;
    yesBtn.style.width = "100vw";
    yesBtn.style.height = "100vh";
    yesBtn.style.fontSize = "3em";
    yesBtn.textContent = "OUI 💖💖💖";
  }
}

// 3️⃣ Commence à bouger le NON après 2 secondes
setTimeout(() => {
  noBtn.addEventListener("mouseenter", moveNo);
  noBtn.addEventListener("touchstart", moveNo);
}, 2000);

// 4️⃣ Clique sur OUI → montre l'image finale
yesBtn.addEventListener("click", () => {
  question.classList.add("hidden");
  result.classList.remove("hidden");
});

// 5️⃣ Génération des cœurs animés
setInterval(() => {
  const heart = document.createElement("span");
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 10 + "px";
  document.querySelector(".hearts").appendChild(heart);

  setTimeout(() => heart.remove(), 6000);
}, 300);
