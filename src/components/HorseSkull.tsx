interface HorseSkullProps {
  className?: string
}

export function HorseSkull({ className = '' }: HorseSkullProps) {
  return (
    <div className={`${className}`}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-40 hover:opacity-60 transition-opacity duration-300"
      >
        {/* Horse skull outline */}
        <path
          d="M24 4C19 4 15 8 15 13V18C15 20 16 22 18 23L16 28C14 30 14 33 16 35L18 37C19 38 21 38 22 37L24 35L26 37C27 38 29 38 30 37L32 35C34 33 34 30 32 28L30 23C32 22 33 20 33 18V13C33 8 29 4 24 4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-emerald-400/30"
        />
        
        {/* Eye sockets */}
        <circle
          cx="20"
          cy="16"
          r="2"
          fill="currentColor"
          className="text-emerald-400/40"
        />
        <circle
          cx="28"
          cy="16"
          r="2"
          fill="currentColor"
          className="text-emerald-400/40"
        />
        
        {/* Nasal cavity */}
        <path
          d="M24 20V26C24 27 23 28 22 28C21 28 20 27 20 26V24C20 23 21 22 22 22H26C27 22 28 23 28 24V26C28 27 27 28 26 28C25 28 24 27 24 26V20Z"
          fill="currentColor"
          className="text-emerald-400/20"
        />
        
        {/* Jaw line */}
        <path
          d="M18 30L20 32H28L30 30"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-emerald-400/30"
        />
        
        {/* Glitch effects - subtle lines */}
        <line
          x1="12"
          y1="14"
          x2="14"
          y2="14"
          stroke="currentColor"
          strokeWidth="1"
          className="text-red-500/60"
        />
        <line
          x1="34"
          y1="16"
          x2="36"
          y2="16"
          stroke="currentColor"
          strokeWidth="1"
          className="text-purple-400/60"
        />
      </svg>
    </div>
  )
}