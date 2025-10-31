interface CurvedDividerProps {
  direction?: 'top' | 'bottom';
  color?: string;
  variant?: 'wave1' | 'wave2' | 'wave3';
  flip?: boolean;
}

export default function CurvedDivider({ 
  direction = 'bottom', 
  color = '#f8f9fa',
  variant = 'wave1',
  flip = false
}: CurvedDividerProps) {
  
  const waves = {
    wave1: "M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z",
    wave2: "M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z",
    wave3: "M0 120L40 110C80 100 160 80 240 75C320 70 400 80 480 85C560 90 640 90 720 85C800 80 880 70 960 70C1040 70 1120 80 1200 85C1280 90 1360 90 1400 90L1440 90V120H1400C1360 120 1280 120 1200 120C1120 120 1040 120 960 120C880 120 800 120 720 120C640 120 560 120 480 120C400 120 320 120 240 120C160 120 80 120 40 120H0Z"
  };

  const rotation = flip ? 'rotate-180' : '';
  const position = direction === 'top' ? 'top-0' : 'bottom-0';

  return (
    <div className={`absolute ${position} left-0 right-0 z-0 pointer-events-none ${rotation}`}>
      <svg 
        viewBox="0 0 1440 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-auto"
      >
        <path d={waves[variant]} fill={color}/>
      </svg>
    </div>
  );
}

