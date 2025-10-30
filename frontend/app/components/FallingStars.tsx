// app/components/FallingStars.tsx
"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  speed: number;
  tail: number;
}

export default function FallingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars: Star[] = [];
  const STAR_COUNT = 100;

  const initStars = (width: number, height: number) => {
    stars.length = 0;
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1 + 0.5,          // одны хэмжээ
        speed: Math.random() * 2 + 1,             // доош хурд
        tail: Math.random() * 50 + 30,            // сүүлний урт
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(canvas.width, canvas.height);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let animationFrameId: number;

    const animate = () => {
      if (!ctx) return;

      // Background
      ctx.fillStyle = "#000000ff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars as circles instead of lines
stars.forEach((star) => {
  // Draw star
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); // тойрог
  ctx.fillStyle = "white"; // тод, fade-гүй
  ctx.fill();

  // Tail (line)
  ctx.beginPath();
  ctx.moveTo(star.x, star.y);
  ctx.lineTo(star.x, star.y - star.tail); // сүүл доош
  ctx.strokeStyle = "rgba(255,255,255,0.5)"; // сүүл бага тод
  ctx.lineWidth = star.radius / 2;
  ctx.stroke();

  // Move down
  star.y += star.speed;

  // Reset if offscreen
  if (star.y - star.tail > canvas.height) {
    star.x = Math.random() * canvas.width;
    star.y = -Math.random() * 50;
    star.radius = Math.random() * 1 + 0.5;
    star.speed = Math.random() * 2 + 1;
    star.tail = Math.random() * 50 + 30;
  }
});

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0"
    />
  );
}
