const k0bal = document.getElementById("k0bal");
const eyeGlows = document.querySelectorAll(".eye-glow");

let leashStrength = 0.06;   // resistance
let maxRotate = 5;         // restrained movement
let panicRadius = 90;
let anger = 0;

// =======================
// MOUSE TRACKING
// =======================
document.addEventListener("mousemove", (e) => {
  const rect = k0bal.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;
  const distance = Math.hypot(dx, dy);

  // Leashed rotation (body resists)
  const rotX = Math.max(-maxRotate, Math.min(maxRotate, dx * leashStrength));
  const rotY = Math.max(-maxRotate, Math.min(maxRotate, dy * leashStrength));

  k0bal.style.transform = `
    rotateX(${-rotY}deg)
    rotateY(${rotX}deg)
  `;

  // Eye glow follows harder (thing inside watches)
  eyeGlows.forEach((glow, i) => {
    const lag = i === 0 ? 0.6 : 1.3;
    const ex = Math.max(-10, Math.min(10, dx * 0.02 * lag));
    const ey = Math.max(-6, Math.min(6, dy * 0.02 * lag));
    glow.style.transform = `translate(${ex}px, ${ey}px)`;
  });

  // Too close = agitation
  if (distance < panicRadius) {
    k0bal.style.filter = "contrast(125%) brightness(90%)";
    twitch();
  } else {
    k0bal.style.filter = "";
  }
});

// =======================
// CLICK = AGGRESSION
// =======================
document.addEventListener("mousedown", () => {
  anger++;

  const shake = Math.min(10 + anger, 20);

  k0bal.animate([
    { transform: "translate(0,0)" },
    { transform: `translate(${shake}px, -${shake}px)` },
    { transform: `translate(-${shake}px, ${shake}px)` },
    { transform: "translate(0,0)" }
  ], {
    duration: 140,
    iterations: 1
  });

  glitchPulse();
});

// =======================
// MICRO TWITCH
// =======================
function twitch() {
  k0bal.style.animation = "none";
  k0bal.offsetHeight; // reflow
  k0bal.style.animation = "";
}

// =======================
// SCREEN GLITCH
// =======================
function glitchPulse() {
  document.body.style.filter = "hue-rotate(12deg) saturate(140%)";
  setTimeout(() => {
    document.body.style.filter = "";
  }, 80);
}

// =======================
// AUTONOMOUS EYE RESET
// (feels like refocusing)
// =======================
setInterval(() => {
  eyeGlows.forEach(glow => {
    glow.animate([
      { transform: glow.style.transform },
      { transform: "translate(0,0)" }
    ], {
      duration: 260,
      iterations: 1
    });
  });
}, 4500 + Math.random() * 4000);

// =======================
// ARG CONSOLE CORRUPTION
// =======================
setInterval(() => {
  const garbage = Math.random().toString(36).slice(2);
  console.log(garbage.repeat(2).slice(0, 26));
}, 5000);
