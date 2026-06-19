import { useEffect, useRef } from "react";

interface Flake {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  driftOffset: number;
  color: string;
  layer: number; // depth layer
}

export default function SnowBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = [
      "rgba(255, 255, 255, 0.55)",
      "rgba(255, 255, 255, 0.4)",
      "rgba(6, 182, 212, 0.28)",
      "rgba(236, 72, 153, 0.28)",
    ];

    const flakes: Flake[] = [];
    const maxFlakes = 90;

    for (let i = 0; i < maxFlakes; i++) {
      const layer = Math.floor(Math.random() * 3); // 0 = far, 1 = mid, 2 = near

      flakes.push({
        x: Math.random() * width,
        y: -Math.random() * height,
        size:
          layer === 0
            ? Math.random() * 2 + 1
            : layer === 1
            ? Math.random() * 3 + 2
            : Math.random() * 4 + 3,
        speedY:
          layer === 0
            ? Math.random() * 0.6 + 0.4
            : layer === 1
            ? Math.random() * 0.9 + 0.6
            : Math.random() * 1.3 + 0.9,
        speedX: Math.random() * 0.4 - 0.2,
        driftOffset: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        layer,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const flake of flakes) {
        ctx.fillStyle = flake.color;

        // Pixelated square flake
        ctx.fillRect(
          Math.floor(flake.x),
          Math.floor(flake.y),
          flake.size,
          flake.size
        );

        // Update vertical fall
        flake.y += flake.speedY;

        // Gentle sine-wave drift
        flake.x += Math.sin((flake.y + flake.driftOffset) * 0.01) * 0.3;
        flake.x += flake.speedX;

        // Respawn logic
        if (flake.y > height) {
          flake.y = -10;
          flake.x = Math.random() * width;
        }

        if (flake.x > width) flake.x = 0;
        if (flake.x < 0) flake.x = width;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="snow-background-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 100,
        display: "block",
      }}
    />
  );
}

