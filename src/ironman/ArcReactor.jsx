import './ironman.css';

export default function ArcReactor({ size = 120, showPower = false, powerLevel = 94.7, onClick }) {
  const r = size / 2;
  const cx = r;
  const cy = r;

  // Radii of each ring relative to size
  const outerR = r * 0.9;
  const midR = r * 0.72;
  const innerR = r * 0.52;
  const coreR = r * 0.28;
  const innerCoreR = r * 0.14;

  // Dash pattern for outer ring
  const outerCircum = 2 * Math.PI * outerR;
  const midCircum = 2 * Math.PI * midR;

  return (
    <div
      className="arc-reactor"
      style={{ width: size, height: size, cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
      title={onClick ? 'Arc Reactor — Click to view system status' : undefined}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`coreGrad_${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#00d4ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0066aa" stopOpacity="0.7" />
          </radialGradient>
          <radialGradient id={`glowGrad_${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
          </radialGradient>
          <filter id={`glow_${size}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`coreGlow_${size}`}>
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background glow */}
        <circle
          cx={cx} cy={cy} r={outerR}
          fill={`url(#glowGrad_${size})`}
        />

        {/* Outer ring — dashed, spinning CW */}
        <g className="arc-ring-outer">
          <circle
            cx={cx} cy={cy} r={outerR}
            stroke="rgba(0, 212, 255, 0.5)"
            strokeWidth="1"
            strokeDasharray={`${outerCircum * 0.08} ${outerCircum * 0.04}`}
            fill="none"
            filter={`url(#glow_${size})`}
          />
        </g>

        {/* Outer ring solid */}
        <circle
          cx={cx} cy={cy} r={outerR}
          stroke="rgba(0, 212, 255, 0.25)"
          strokeWidth="0.5"
          fill="none"
        />

        {/* Mid ring — dashed, spinning CCW */}
        <g className="arc-ring-mid">
          <circle
            cx={cx} cy={cy} r={midR}
            stroke="rgba(0, 212, 255, 0.7)"
            strokeWidth="1.5"
            strokeDasharray={`${midCircum * 0.06} ${midCircum * 0.03} ${midCircum * 0.02} ${midCircum * 0.03}`}
            fill="none"
            filter={`url(#glow_${size})`}
          />
        </g>

        {/* Mid ring tick marks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
          const x1 = cx + midR * Math.cos(angle);
          const y1 = cy + midR * Math.sin(angle);
          const x2 = cx + (midR + r * 0.06) * Math.cos(angle);
          const y2 = cy + (midR + r * 0.06) * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(0, 212, 255, 0.6)"
              strokeWidth={i % 3 === 0 ? 1.5 : 0.8}
            />
          );
        })}

        {/* Inner ring — spinning CW */}
        <g className="arc-ring-inner">
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * 2 * Math.PI;
            const x1 = cx + innerR * 0.85 * Math.cos(angle);
            const y1 = cy + innerR * 0.85 * Math.sin(angle);
            const x2 = cx + innerR * 1.1 * Math.cos(angle);
            const y2 = cy + innerR * 1.1 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(0, 212, 255, 0.8)"
                strokeWidth="1.5"
                filter={`url(#glow_${size})`}
              />
            );
          })}
          <circle
            cx={cx} cy={cy} r={innerR}
            stroke="rgba(0, 212, 255, 0.4)"
            strokeWidth="1"
            fill="none"
          />
        </g>

        {/* Hexagonal inner structure */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * 2 * Math.PI + Math.PI / 6;
          const px = cx + coreR * 0.7 * Math.cos(angle);
          const py = cy + coreR * 0.7 * Math.sin(angle);
          const nextAngle = ((i + 1) / 6) * 2 * Math.PI + Math.PI / 6;
          const nx = cx + coreR * 0.7 * Math.cos(nextAngle);
          const ny = cy + coreR * 0.7 * Math.sin(nextAngle);
          return (
            <line
              key={i}
              x1={px} y1={py} x2={nx} y2={ny}
              stroke="rgba(0, 212, 255, 0.5)"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Core glow */}
        <g className="arc-core">
          <circle
            cx={cx} cy={cy} r={coreR}
            fill="rgba(0, 100, 180, 0.3)"
            stroke="rgba(0, 212, 255, 0.7)"
            strokeWidth="1"
          />
          <circle
            cx={cx} cy={cy} r={coreR * 0.7}
            fill="rgba(0, 150, 220, 0.4)"
            filter={`url(#coreGlow_${size})`}
          />
          <circle
            cx={cx} cy={cy} r={innerCoreR}
            fill={`url(#coreGrad_${size})`}
            filter={`url(#coreGlow_${size})`}
          />
          {/* Inner core highlight */}
          <circle
            cx={cx - innerCoreR * 0.3}
            cy={cy - innerCoreR * 0.3}
            r={innerCoreR * 0.4}
            fill="rgba(255, 255, 255, 0.6)"
          />
        </g>
      </svg>

      {showPower && (
        <div className="arc-power-display">
          {powerLevel}% POWER
        </div>
      )}
    </div>
  );
}
