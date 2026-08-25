import { useEffect, useRef } from 'react';

export default function SecondFooterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const footer = canvas?.parentElement;
    if (!canvas || !footer) return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dots: { ox: number; oy: number; x: number; y: number }[] = [];
    let raf = 0;
    let running = false;
    let width = 0;
    let height = 0;
    const pointer = { x: -9999, y: -9999, inside: false };

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const box = footer.getBoundingClientRect();
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots.length = 0;
      for (let y = 13; y < height; y += 26) {
        for (let x = 13; x < width; x += 26) {
          dots.push({ ox: x, oy: y, x, y });
        }
      }
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      let settled = true;
      for (const dot of dots) {
        const dx = dot.ox - pointer.x;
        const dy = dot.oy - pointer.y;
        const dist = Math.hypot(dx, dy);
        let tx = dot.ox;
        let ty = dot.oy;
        let heat = 0;
        if (pointer.inside && dist < 150) {
          heat = (1 - dist / 150) ** 2;
          tx = dot.ox + (dx / (dist || 1)) * heat * 22;
          ty = dot.oy + (dy / (dist || 1)) * heat * 22;
        }
        dot.x += (tx - dot.x) * 0.14;
        dot.y += (ty - dot.y) * 0.14;
        if (Math.abs(dot.x - tx) > 0.1 || Math.abs(dot.y - ty) > 0.1) settled = false;
        const alpha = 0.14 + 0.65 * heat;
        const radius = 1.1 + 1.4 * heat;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = heat > 0.5 ? `rgba(255, 196, 0, ${alpha})` : `rgba(244, 242, 237, ${alpha})`;
        ctx.fill();
      }
      return settled;
    };

    const loop = () => {
      if (draw() && !pointer.inside) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const onMove = (event: PointerEvent) => {
      const box = footer.getBoundingClientRect();
      pointer.x = event.clientX - box.left;
      pointer.y = event.clientY - box.top;
      pointer.inside = true;
      kick();
    };

    const onLeave = () => {
      pointer.inside = false;
      pointer.x = -9999;
      pointer.y = -9999;
      kick();
    };

    layout();
    const observer = new ResizeObserver(layout);
    observer.observe(footer);
    footer.addEventListener('pointermove', onMove);
    footer.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      footer.removeEventListener('pointermove', onMove);
      footer.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="second-footer-canvas" />;
}
