(() => {
  const canvas = document.createElement("canvas");
  canvas.id = "dot-particle-canvas";
  // The primary gold/orange color #c9a24d (rgb: 201, 162, 77)
  const particleColor = "201, 162, 77"; 
  const animationSpeed = 0.006;
  
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999"; // Needs to be above content to be seen but pointer-events:none allows clicking through
  
  document.body.appendChild(canvas);

  let requestId = null;
  let time = 0;
  const particles = [];
  
  const resizeCanvas = () => {
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    canvas.style.width = displayWidth + "px";
    canvas.style.height = displayHeight + "px";

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  };

  const handleMouseDown = (e) => {
    // Solo generar particulas si el clic no viene de un boton importante, etc (Opcional, pero se ve que quieres que sea en cualquier sitio).
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create beautiful particle burst at click location
    const numParticles = 25 + Math.random() * 15; // 25-40 particles

    for (let i = 0; i < numParticles; i++) {
      const angle = (Math.PI * 2 * i) / numParticles + (Math.random() - 0.5) * 0.5;
      const speed = 2 + Math.random() * 4;
      const size = 1 + Math.random() * 3;

      particles.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 2000 + Math.random() * 3000,
        size: size,
        angle: angle,
        speed: speed,
      });
    }

    // Add some slower, larger particles for variety
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1.5;

      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 4000 + Math.random() * 2000,
        size: 2 + Math.random() * 2,
        angle: angle,
        speed: speed,
      });
    }
  };

  const animate = () => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    time += animationSpeed;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // We only clear out everything instead of painting a background, since our canvas is transparent overlay.
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      particle.life += 16; // Assuming 60fps
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Apply gentle physics
      particle.vy += 0.02; // Subtle gravity
      particle.vx *= 0.995; // Air resistance
      particle.vy *= 0.995;

      // Add some organic movement
      const organicX = Math.sin(time + particle.angle) * 0.3;
      const organicY = Math.cos(time + particle.angle * 0.7) * 0.2;
      particle.x += organicX;
      particle.y += organicY;

      // Calculate alpha and size based on life
      const lifeProgress = particle.life / particle.maxLife;
      const alpha = Math.max(0, (1 - lifeProgress) * 0.8);
      const currentSize = particle.size * (1 - lifeProgress * 0.3);

      // Draw crisp particle
      if (alpha > 0) {
        ctx.fillStyle = `rgba(${particleColor}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, 2 * Math.PI);
        ctx.fill();
      }

      if (!(
        particle.life < particle.maxLife &&
        particle.x > -50 &&
        particle.x < width + 50 &&
        particle.y > -50 &&
        particle.y < height + 50
      )) {
        particles.splice(i, 1);
      }
    }

    requestId = requestAnimationFrame(animate);
  };

  window.addEventListener("resize", resizeCanvas);
  
  // Usamos el evento mousedown y touchstart para que funcione tanto en pc como tactil.
  window.addEventListener("mousedown", handleMouseDown); 
  window.addEventListener("touchstart", (e) => {
    if(e.touches.length > 0) {
        handleMouseDown({
            clientX: e.touches[0].clientX,
            clientY: e.touches[0].clientY
        });
    }
  }, {passive: true});

  // Initial setup
  resizeCanvas();
  animate();
})();
