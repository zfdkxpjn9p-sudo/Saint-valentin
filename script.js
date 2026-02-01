const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const question = document.getElementById("question-container");
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const funnyText = document.getElementById("funny-text");

let yesScale = 1;
let attempts = 0;

// Bouton NON fuit
noBtn.addEventListener("touchstart", moveNo);
noBtn.addEventListener("mouseenter", moveNo);

function moveNo() {
  attempts++;
  sound.currentTime = 0;
  sound.play();

  yesScale += 0.25;
  yesBtn.style.transform = `scale(${yesScale})`;

  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 200);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  if (attempts > 5) {
    funnyText.classList.remove("hidden");
  }

  // Si trop longtemps → OUI plein écran
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

// Clique sur OUI
yesBtn.addEventListener("click", () => {
  question.classList.add("hidden");
  result.classList.remove("hidden");
});

// 💖 Génération des cœurs
setInterval(() => {
  const heart = document.createElement("span");
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 10 + "px";
  document.querySelector(".hearts").appendChild(heart);

  setTimeout(() => heart.remove(), 6000);
}, 300);
