(function() {
  // Configuration
  const sparkColor = '#c9a24d'; // The primary gold/orange color from variables.css
  const sparkSize = 10;
  const sparkRadius = 15;
  const sparkCount = 8;
  const duration = 400;
  const easing = 'ease-out';
  const extraScale = 1.0;

  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.id = 'click-spark-canvas';
  
  // Style the canvas to cover the whole screen as a transparent overlay
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none', // Allow clicks to pass through
    zIndex: '9999',       // Ensure it's on top of other content
    userSelect: 'none',
    display: 'block'
  });
  
  document.body.appendChild(canvas);

  let sparks = [];
  let startTime = null;

  // Resize handler to keep canvas full screen
  const resizeCanvas = () => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  };

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Easing function
  const easeFunc = (t) => {
    switch (easing) {
      case 'linear':
        return t;
      case 'ease-in':
        return t * t;
      case 'ease-in-out':
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default: // ease-out
        return t * (2 - t);
    }
  };

  // Animation loop
  const draw = (timestamp) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    const now = performance.now();

    sparks = sparks.filter(spark => {
      const elapsed = now - spark.startTime;
      if (elapsed >= duration) {
        return false;
      }

      const progress = elapsed / duration;
      const eased = easeFunc(progress);

      const distance = eased * sparkRadius * extraScale;
      const lineLength = sparkSize * (1 - eased);

      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

      ctx.strokeStyle = sparkColor;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      return true;
    });

    requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);

  // Interaction handler
  const handleClick = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    const now = performance.now();
    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now
    }));

    sparks.push(...newSparks);
  };

  // Add event listeners to the window
  window.addEventListener('mousedown', handleClick);
  window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      handleClick({
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY
      });
    }
  }, { passive: true });

})();
