const k0bal = document.getElementById("k0bal");
const eyes = document.querySelectorAll(".eye-glow");

let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;
let currentX = targetX;
let currentY = targetY;

let agitation = 0;
let glitching = false;

document.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const dx = targetX - centerX;
  const dy = targetY - centerY;
  const distance = Math.hypot(dx, dy);

  // Cursor too close = agitation rises
  if (distance < 140) {
    agitation = Math.min(1, agitation + 0.03);
    triggerGlitch();
  } else {
    agitation = Math.max(0, agitation - 0.01);
  }
});

function animate() {
  // Slow, predatory tracking
  currentX += (targetX - currentX) * 0.05;
  currentY += (targetY - currentY) * 0.05;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const dx = currentX - centerX;
  const dy = currentY - centerY;

  const maxMove = 8 + agitation * 6;

  const moveX = Math.max(-maxMove, Math.min(maxMove, dx / 45));
  const moveY = Math.max(-maxMove, Math.min(maxMove, dy / 45));

  eyes.forEach((eye, i) => {
    const jitter = agitation * (Math.random() - 0.5) * 2;

    eye.style.transform = `
      translate(${moveX + jitter}px, ${moveY - jitter}px)
      scale(${1 + agitation * 0.15})
    `;
  });

  // Subtle blame-lean
  k0bal.style.transform = `
    translate(${moveX * 0.4}px, ${moveY * 0.4}px)
    rotate(${moveX * 0.03}deg)
  `;

  requestAnimationFrame(animate);
}

function triggerGlitch() {
  if (glitching) return;
  glitching = true;

  k0bal.style.filter = "contrast(130%) brightness(120%)";
  k0bal.style.transform += " scale(1.02)";

  setTimeout(() => {
    k0bal.style.filter = "";
    glitching = false;
  }, 80);
}

animate();
