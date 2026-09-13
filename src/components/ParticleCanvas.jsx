import React, { useEffect, useRef } from 'react';

export const ParticleCanvas = ({ intensity = 'normal' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const count = intensity === 'high' ? 65 : 45;
    
    // Soft pastel floating particles
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      color: Math.random() > 0.4 ? '#F4C2C2' : (Math.random() > 0.5 ? '#D8BBFF' : '#FFF1E6'),
      alpha: Math.random() * 0.45 + 0.15,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: -Math.random() * 0.35 - 0.08,
      pulse: Math.random() * 0.015 + 0.005,
    }));

    // Soft twinkling stars in pastel cream
    const stars = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.3 + 0.4,
      alpha: Math.random() * 0.5,
      speed: Math.random() * 0.01 + 0.003,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Pastel radial center glow
      const centerGrad = ctx.createRadialGradient(
        width / 2, height * 0.4, 10,
        width / 2, height * 0.4, width * 0.65
      );
      centerGrad.addColorStop(0, 'rgba(244, 194, 194, 0.08)');
      centerGrad.addColorStop(0.5, 'rgba(216, 187, 255, 0.04)');
      centerGrad.addColorStop(1, 'rgba(20, 17, 26, 0)');
      ctx.fillStyle = centerGrad;
      ctx.fillRect(0, 0, width, height);

      // Soft ambient stars
      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 0.75 || star.alpha < 0.1) {
          star.speed = -star.speed;
        }
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(0.75, star.alpha));
        ctx.fillStyle = '#FFF1E6';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Warm pastel floating dust
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += Math.sin(Date.now() * p.pulse) * 0.005;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(0.7, p.alpha));
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
