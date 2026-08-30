import { useEffect, type RefObject } from 'react';

type OrientationCtor = {
  requestPermission?: () => Promise<PermissionState>;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function screenAngle(): number {
  return window.screen.orientation.angle;
}

function mapTilt(beta: number, gamma: number): { rx: number; ry: number } {
  const angle = screenAngle();
  let pitch = beta;
  let roll = gamma;

  if (angle === 90) {
    pitch = -gamma;
    roll = beta;
  } else if (angle === -90 || angle === 270) {
    pitch = gamma;
    roll = -beta;
  } else if (angle === 180) {
    pitch = -beta;
    roll = -gamma;
  }

  const rx = clamp(-(pitch - 55) * 0.55, -16, 16);
  const ry = clamp(roll * 0.7, -18, 18);
  return { rx, ry };
}

export function useGyroButtonDepth(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    let listening = false;
    let raf = 0;
    let targetRx = 0;
    let targetRy = 0;
    let curRx = 0;
    let curRy = 0;

    const paint = () => {
      curRx += (targetRx - curRx) * 0.16;
      curRy += (targetRy - curRy) * 0.16;
      const lx = 50 + curRy * 1.35;
      const ly = 20 - curRx * 1.1;
      root.style.setProperty('--gyro-rx', `${curRx.toFixed(3)}deg`);
      root.style.setProperty('--gyro-ry', `${curRy.toFixed(3)}deg`);
      root.style.setProperty('--gyro-lx', `${lx.toFixed(2)}%`);
      root.style.setProperty('--gyro-ly', `${ly.toFixed(2)}%`);
      root.style.setProperty('--gyro-sx', `${(-curRy * 0.42).toFixed(2)}px`);
      root.style.setProperty('--gyro-sy', `${(12 + curRx * 0.4).toFixed(2)}px`);
      if (Math.abs(targetRx - curRx) > 0.02 || Math.abs(targetRy - curRy) > 0.02) {
        raf = requestAnimationFrame(paint);
      } else {
        raf = 0;
      }
    };

    const onOrient = (event: DeviceOrientationEvent) => {
      if (event.beta === null || event.gamma === null) return;
      const tilt = mapTilt(event.beta, event.gamma);
      targetRx = tilt.rx;
      targetRy = tilt.ry;
      if (raf === 0) raf = requestAnimationFrame(paint);
    };

    const listen = () => {
      if (listening) return;
      listening = true;
      root.classList.add('is-gyro');
      window.addEventListener('deviceorientation', onOrient);
    };

    const startFromGesture = () => {
      root.removeEventListener('pointerdown', startFromGesture);
      const ctor = DeviceOrientationEvent as unknown as OrientationCtor;
      void ctor.requestPermission!().then((state) => {
        if (state === 'granted') listen();
      });
    };

    const ctor = DeviceOrientationEvent as unknown as OrientationCtor;
    if (typeof ctor.requestPermission === 'function') {
      root.addEventListener('pointerdown', startFromGesture);
    } else {
      listen();
    }

    return () => {
      root.removeEventListener('pointerdown', startFromGesture);
      window.removeEventListener('deviceorientation', onOrient);
      cancelAnimationFrame(raf);
      root.classList.remove('is-gyro');
      root.style.removeProperty('--gyro-rx');
      root.style.removeProperty('--gyro-ry');
      root.style.removeProperty('--gyro-lx');
      root.style.removeProperty('--gyro-ly');
      root.style.removeProperty('--gyro-sx');
      root.style.removeProperty('--gyro-sy');
    };
  }, [rootRef]);
}
