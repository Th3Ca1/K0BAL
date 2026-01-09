
const k0bal = document.getElementById("k0bal");
const eyeGlows = document.querySelectorAll(".eye-glow");

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;
let agitation = 0;
let anger = 0;

document.addEventListener("mousemove", (e) => {
  // Calculate center of K0BAL
  const rect = k0bal.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Distance from cursor to K0BAL
  targetX = e.clientX - centerX;
  targetY = e.clientY - centerY;

  const distance = Math.hypot(targetX, targetY);

  // Agitation logic
  if (distance < 150) {
    agitation = Math.min(1, agitation + 0.05);
    if (Math.random() > 0.9) triggerGlitch();
  } else {
    agitation = Math.max(0, agitation - 0.02);
  }
});

function animate() {
  // Smooth "predatory" easing
  currentX += (targetX - currentX) * 0.1;
  currentY += (targetY - currentY) * 0.1;

  // Body Rotation
  const rotX = Math.max(-15, Math.min(15, currentY * -0.05));
  const rotY = Math.max(-15, Math.min(15, currentX * 0.05));
  
  k0bal.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

  // Eye movement
  eyeGlows.forEach((glow) => {
    const jitter = agitation * (Math.random() - 0.5) * 5;
    const ex = Math.max(-15, Math.min(15, currentX * 0.08)) + jitter;
    const ey = Math.max(-10, Math.min(10, currentY * 0.08)) + jitter;
    glow.style.transform = `translate(${ex}px, ${ey}px) scale(${1 + agitation * 0.5})`;
  });

  requestAnimationFrame(animate);
}

// Click to increase anger
document.addEventListener("mousedown", () => {
  anger += 5;
  k0bal.animate([
    { transform: "translate(0,0) scale(1)" },
    { transform: `translate(${10 + anger}px, 0) scale(1.1)` },
    { transform: "translate(0,0) scale(1)" }
  ], { duration: 100 });
  
  document.body.style.backgroundColor = "#1a0000";
  setTimeout(() => document.body.style.backgroundColor = "#0a0a0a", 50);
});

function triggerGlitch() {
  k0bal.style.filter = `contrast(${150 + agitation * 100}%) brightness(150%)`;
  setTimeout(() => k0bal.style.filter = "", 50);
}

// Creepy Console Logs
setInterval(() => {
  const messages = ["I SEE YOU", "STOP MOVING", "K0BAL IS WATCHING", "01001000 01000101 01001100 01010000"];
  console.log(messages[Math.floor(Math.random() * messages.length)]);
}, 4000);

animate();
