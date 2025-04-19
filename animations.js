

class FloatingCircle {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.radius = 10 + Math.random() * 20;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.alpha = 0.1 + Math.random() * 0.3;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < -this.radius) this.x = this.canvas.width + this.radius;
    if (this.x > this.canvas.width + this.radius) this.x = -this.radius;
    if (this.y < -this.radius) this.y = this.canvas.height + this.radius;
    if (this.y > this.canvas.height + this.radius) this.y = -this.radius;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(107, 70, 193, ${this.alpha})`; 
    this.ctx.fill();
  }
}

function initFloatingCircles() {
  const canvas = document.createElement('canvas');
  canvas.classList.add('floating-circles-canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';

  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let circles = [];
  const circleCount = 20;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < circleCount; i++) {
    circles.push(new FloatingCircle(canvas, ctx));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(circle => {
      circle.update();
      circle.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

document.addEventListener('DOMContentLoaded', () => {
  initFloatingCircles();

  function animateButtonClick(button) {
    button.classList.add('button-click-animate');
    button.addEventListener('animationend', () => {
      button.classList.remove('button-click-animate');
    }, { once: true });
  }

  const qrisButton = document.getElementById('qris-button');
  const bankButton = document.getElementById('bank-button');

  qrisButton.addEventListener('click', () => {
    animateButtonClick(qrisButton);
  });

  bankButton.addEventListener('click', () => {
    animateButtonClick(bankButton);
  });
});
