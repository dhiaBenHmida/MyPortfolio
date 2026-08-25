import { useEffect, useRef } from 'react';

interface SecondBlobCursorProps {
  color?: string;
  size?: number;
}

const hosts = new Set<{
  el: HTMLDivElement;
  rect: DOMRect;
  engaged: boolean;
  tx: number;
  ty: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  sx: number;
  sy: number;
  opacity: number;
}>();

let raf = 0;
let looping = false;

function tick() {
  let keep = false;
  for (const host of hosts) {
    host.vx += (host.tx - host.x) * 0.14;
    host.vy += (host.ty - host.y) * 0.14;
    host.vx *= 0.76;
    host.vy *= 0.76;
    host.x += host.vx;
    host.y += host.vy;
    const speed = Math.min(1, Math.hypot(host.vx, host.vy) / 26);
    const rot = Math.atan2(host.vy, host.vx);
    host.sx += (1 + 0.6 * speed - host.sx) * 0.2;
    host.sy += (1 - 0.35 * speed - host.sy) * 0.2;
    host.opacity += (Number(host.engaged) - host.opacity) * 0.2;
    host.el.style.opacity = host.opacity.toFixed(3);
    host.el.style.transform = `translate3d(${host.x.toFixed(1)}px, ${host.y.toFixed(1)}px, 0) rotate(${rot.toFixed(3)}rad) scale(${host.sx.toFixed(3)}, ${host.sy.toFixed(3)})`;
    if (host.engaged || host.opacity >= 0.01 || Math.abs(host.vx) + Math.abs(host.vy) >= 0.05) {
      keep = true;
    }
  }
  if (keep) raf = requestAnimationFrame(tick);
  else looping = false;
}

function startLoop() {
  if (!looping) {
    looping = true;
    raf = requestAnimationFrame(tick);
  }
}

export default function SecondBlobCursor({ color = '#1B3CFF', size = 52 }: SecondBlobCursorProps) {
  const probe = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = probe.current?.parentElement;
    if (!host) return;
    if (
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const el = document.createElement('div');
    const half = size / 2;
    el.setAttribute('aria-hidden', 'true');
    Object.assign(el.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: `${size}px`,
      height: `${size}px`,
      margin: `-${half}px 0 0 -${half}px`,
      borderRadius: '50%',
      background: `var(--blob-color, ${color})`,
      pointerEvents: 'none',
      willChange: 'transform',
      opacity: '0',
      zIndex: '60',
      mixBlendMode: 'difference',
    });
    host.appendChild(el);
    host.classList.add('blob-cursor-scope');

    const state = {
      el,
      rect: host.getBoundingClientRect(),
      engaged: false,
      tx: 0,
      ty: 0,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      sx: 1,
      sy: 1,
      opacity: 0,
    };

    const measure = () => {
      state.rect = host.getBoundingClientRect();
    };
    const onEnter = (event: PointerEvent) => {
      measure();
      state.engaged = true;
      state.tx = state.x = event.clientX - state.rect.left;
      state.ty = state.y = event.clientY - state.rect.top;
      startLoop();
    };
    const onMove = (event: PointerEvent) => {
      state.engaged = true;
      state.tx = event.clientX - state.rect.left;
      state.ty = event.clientY - state.rect.top;
      startLoop();
    };
    const onLeave = () => {
      state.engaged = false;
      startLoop();
    };

    host.addEventListener('pointerenter', onEnter);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, { passive: true });
    hosts.add(state);

    return () => {
      host.removeEventListener('pointerenter', onEnter);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
      host.classList.remove('blob-cursor-scope');
      el.remove();
      hosts.delete(state);
      if (hosts.size === 0) {
        cancelAnimationFrame(raf);
        looping = false;
      }
    };
  }, [color, size]);

  return <span hidden ref={probe} />;
}
