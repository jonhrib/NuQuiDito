window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

document.body.classList.add("locked");

const intro = document.getElementById("intro");
document.getElementById("enterBtn").addEventListener("click", () => {
  intro.classList.add("hide");
  document.body.classList.remove("locked");
  setTimeout(() => confetti(35), 350);
});

function confetti(amount = 20) {
  const layer = document.getElementById("confetti-layer");
  const symbols = ["💜","💗","✨","✦","•"];
  for (let i = 0; i < amount; i++) {
    const el = document.createElement("span");
    el.className = "confetti";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = (10 + Math.random() * 18) + "px";
    el.style.setProperty("--x", (Math.random() * 260 - 130) + "px");
    el.style.animationDelay = Math.random() * .4 + "s";
    layer.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }
}

const messages = [
  "FELIPE, O BRASIL ESTÁ CONTIGO. 🇧🇷",
  "ATENÇÃO: NÍVEL DE TORCIDA +37%.",
  "ATÉ O CACHORRO ACREDITA EM VOCÊ. 🐶",
  "VOCÊ CONSEGUE. E NÓS TEMOS PROVAS.",
  "IDEIAS CONECTADAS. CORAÇÕES TAMBÉM. 💜",
  "POMPOM ESQUERDO: PRONTO. POMPOM DIREITO: PRONTO.",
  "STATUS: TORCENDO MUITO. 📣"
];

let cheer = 100;
function cheerUp() {
  cheer = Math.min(1000, cheer + Math.floor(15 + Math.random() * 45));
  const fill = document.getElementById("meterFill");
  const text = document.getElementById("meterText");
  fill.style.width = Math.min(100, cheer / 10) + "%";
  text.textContent = "TORCIDA: " + cheer + "%";
  document.getElementById("randomMessage").textContent = messages[Math.floor(Math.random() * messages.length)];
  document.querySelector(".cheer-inner").classList.add("wiggle");
  setTimeout(() => document.querySelector(".cheer-inner").classList.remove("wiggle"), 1400);
  confetti(12);
}
document.getElementById("cheerBtn").addEventListener("click", cheerUp);
document.getElementById("pomBtn").addEventListener("click", cheerUp);
document.getElementById("finalBtn").addEventListener("click", () => {
  document.getElementById("randomMessage").textContent = "ENERGIA POSITIVA ENVIADA COM SUCESSO. 💜✨";
  confetti(55);
});

const heartBtn = document.getElementById("heartBtn");
heartBtn.addEventListener("click", () => {
  heartBtn.classList.toggle("loved");
  heartBtn.textContent = heartBtn.classList.contains("loved") ? "♥" : "♡";
  confetti(10);
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

function loadPhoto(element, path) {
  const img = new Image();
  img.onload = () => {
    element.style.backgroundImage = `url("${path}")`;
    element.classList.add("has-image");
  };
  img.src = path;
}
document.querySelectorAll("[data-photo]").forEach(el => {
  const file = el.dataset.photo;
  loadPhoto(el, "fotos/" + file);
});

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
document.querySelectorAll(".gallery-card").forEach(card => {
  card.addEventListener("click", () => {
    const path = card.dataset.image;
    const img = new Image();
    img.onload = () => {
      modalImage.src = path;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    };
    img.onerror = () => {
      confetti(8);
      document.getElementById("randomMessage").textContent = "Essa foto ainda está esperando para ser colocada na pasta /fotos/ 👀";
    };
    img.src = path;
  });
});
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalImage.src = "";
}
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelectorAll(".hero .reveal").forEach(el => el.classList.add("visible"));
  }, 300);
});
