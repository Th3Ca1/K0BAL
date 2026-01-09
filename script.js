const k0bal = document.getElementById("k0bal");
const eyes = document.querySelectorAll(".eye");
const core = document.getElementById("core");

let leashStrength = 0.08;   // how much K0BAL resists you
let maxRotate = 6;         // degrees (keeps him restrained)
let panicRadius = 90;      // distance where he flinches
let anger = 0;             // builds when clicked

// Track mouse (your "face")
document.addEventListener("mousemove", (e) => {
  const rect = k0bal.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;

  const distance = Math.hypot(dx, dy);

  // Rotation (leashed)
  const targetX = Math.max(-maxRotate, Math.min(maxRotate, dx * leashStrength));
  const targetY = Math.max(-maxRotate, Math.min(maxRotate, dy * leashStrength));

  k0bal.style.transform = `
    rotateX(${-targetY}deg)
    rotateY(${targetX}deg)
  `;

  // Eyes track harder than body (blame stare)
const eyeGlows = document.querySelectorAll(".eye-glow");

eyeGlows.forEach((glow, i) => {
  const lag = i === 0 ? 0.6 : 1.3;
  const ex = Math.max(-10, Math.min(10, dx * 0.02 * lag));
  const ey = Math.max(-6, Math.min(6, dy * 0.02 * lag));
  glow.style.transform = `translate(${ex}px, ${ey}px)`;
});

  // Too close = panic reaction
  if (distance < panicRadius) {
    k0bal.style.filter = "contrast(120%) brightness(90%)";
    jitter();
  } else {
    k0bal.style.filter = "";
  }
});

// Click = pain / accusation
document.addEventListener("mousedown", () => {
  anger++;

  const shake = 6 + anger;
  k0bal.animate([
    { transform: "translate(0,0)" },
    { transform: `translate(${shake}px, -${shake}px)` },
    { transform: `translate(-${shake}px, ${shake}px)` },
    { transform: "translate(0,0)" }
  ], {
    duration: 120,
    iterations: 1
  });

  core.style.boxShadow = `
    0 0 ${20 + anger * 4}px rgba(255,0,0,0.9),
    inset 0 0 20px rgba(0,0,0,0.9)
  `;

  glitchPulse();
});

// Subtle involuntary twitch
function jitter() {
  k0bal.style.animation = "none";
  k0bal.offsetHeight; // force reflow
  k0bal.style.animation = "";
}

// Screen-level glitch when abused
function glitchPulse() {
  document.body.style.filter = "hue-rotate(10deg)";
  setTimeout(() => {
    document.body.style.filter = "";
  }, 60);
}

// Occasional autonomous stare correction
setInterval(() => {
  eyes.forEach(eye => {
    eye.animate([
      { transform: eye.style.transform },
      { transform: "translate(0,0)" }
    ], {
      duration: 300,
      iterations: 1
    });
  });
}, 4000 + Math.random() * 4000);

// Corrupted console output (ARG flavor)
setInterval(() => {
  const garbage = Math.random().toString(36).slice(2);
  console.log(garbage.repeat(2).slice(0, 24));
}, 5000);
