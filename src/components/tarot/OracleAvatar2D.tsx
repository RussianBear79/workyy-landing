import { useEffect, useRef } from 'react'
import type { OracleExpression } from '../../hooks/useTarotGame'

type SmokeState = 'A' | 'B' | 'C' | 'D'

interface OracleAvatar2DProps {
  smokeLevel: SmokeState
  expression: OracleExpression
}

const smokeConfig = {
  A: { opacity: 0.75, density: 100 },
  B: { opacity: 0.55, density: 70 },
  C: { opacity: 0.35, density: 40 },
  D: { opacity: 0.2, density: 15 },
} as const

const expressionStyles: Record<OracleExpression, React.CSSProperties> = {
  neutral: {
    transform: 'translateY(0)',
  },
  smile: {
    transform: 'translateY(-2px)',
    filter: 'brightness(1.1)',
  },
  sad: {
    transform: 'translateY(2px)',
    filter: 'brightness(0.9)',
  },
  smirk: {
    transform: 'translateY(-1px) translateX(2px)',
    filter: 'brightness(1.05)',
  },
}

export function OracleAvatar2D({ smokeLevel, expression }: OracleAvatar2DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const smokeRef = useRef<HTMLDivElement>(null)
  const config = smokeConfig[smokeLevel]

  // Update smoke opacity on state change
  useEffect(() => {
    if (smokeRef.current) {
      smokeRef.current.style.opacity = String(config.opacity)
    }
  }, [smokeLevel, config.opacity])

  return (
    <div 
      ref={containerRef}
      className="oracle-avatar-2d"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #3a2f1f 0%, #5a4a3a 50%, #2a1f15 100%)',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'grid\' width=\'20\' height=\'20\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M 20 0 L 0 0 0 20\' fill=\'none\' stroke=\'%23404040\' stroke-width=\'0.5\' opacity=\'0.3\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100\' height=\'100\' fill=\'url(%23grid)\'/%3E%3C/svg%3E")',
      }}
    >
      {/* Background ambient glow - futuristic teal */}
      <div
        className="oracle-avatar-2d__glow"
        style={{
          position: 'absolute',
          width: '120%',
          height: '120%',
          background: 'radial-gradient(ellipse at 50% 40%, rgba(0, 200, 255, 0.2) 0%, transparent 70%)',
          animation: 'pulse-glow 4s ease-in-out infinite',
        }}
      />

      {/* Main avatar container */}
      <div
        className="oracle-avatar-2d__character"
        style={{
          position: 'relative',
          zIndex: 2,
          transition: 'all 0.5s ease-in-out',
          ...expressionStyles[expression],
        }}
      >
        {/* Head */}
        <div
          className="oracle-avatar-2d__head"
          style={{
            position: 'relative',
            width: '200px',
            height: '240px',
            margin: '0 auto',
            animation: 'breathing 3s ease-in-out infinite',
          }}
        >
          {/* Face base */}
          <div
            style={{
              position: 'absolute',
              width: '140px',
              height: '180px',
              left: '50%',
              top: '20px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #F5D5B8 0%, #E8C5A0 100%)',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              boxShadow: 'inset -10px -15px 30px rgba(0,0,0,0.2)',
            }}
          />

          {/* Futuristic Goggles */}
          <div
            style={{
              position: 'absolute',
              width: '120px',
              height: '50px',
              left: '50%',
              top: '65px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)',
              borderRadius: '25px',
              border: '3px solid #333',
              boxShadow: '0 4px 10px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.1)',
            }}
          >
            {/* Blue lenses */}
            <div
              style={{
                position: 'absolute',
                width: '38px',
                height: '38px',
                left: '12px',
                top: '6px',
                background: 'radial-gradient(circle, #00C8FF 0%, #0066AA 50%, #001122 100%)',
                borderRadius: '50%',
                boxShadow: '0 0 15px rgba(0, 200, 255, 0.8), inset 0 0 10px rgba(0, 200, 255, 0.5)',
                border: '2px solid #004488',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '38px',
                height: '38px',
                right: '12px',
                top: '6px',
                background: 'radial-gradient(circle, #00C8FF 0%, #0066AA 50%, #001122 100%)',
                borderRadius: '50%',
                boxShadow: '0 0 15px rgba(0, 200, 255, 0.8), inset 0 0 10px rgba(0, 200, 255, 0.5)',
                border: '2px solid #004488',
              }}
            />
            {/* Red strap */}
            <div
              style={{
                position: 'absolute',
                width: '140px',
                height: '8px',
                left: '50%',
                top: '-4px',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(90deg, #AA0000 0%, #FF3333 50%, #AA0000 100%)',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
              }}
            />
          </div>

          {/* Mouth - expression dependent */}
          <div
            style={{
              position: 'absolute',
              width: expression === 'smile' ? '40px' : expression === 'sad' ? '35px' : expression === 'smirk' ? '38px' : '30px',
              height: expression === 'smile' ? '8px' : expression === 'sad' ? '6px' : expression === 'smirk' ? '7px' : '4px',
              left: '50%',
              top: expression === 'smile' ? '140px' : expression === 'sad' ? '145px' : expression === 'smirk' ? '142px' : '143px',
              transform: `translateX(-50%) ${expression === 'smirk' ? 'translateX(5px)' : ''}`,
              border: '2px solid #1a0a0a',
              borderRadius: expression === 'smile' ? '0 0 40px 40px' : expression === 'sad' ? '40px 40px 0 0' : expression === 'smirk' ? '0 0 40px 20px' : '50%',
              borderTop: expression === 'smile' ? 'none' : expression === 'sad' ? '2px solid #1a0a0a' : expression === 'smirk' ? 'none' : '2px solid #1a0a0a',
              transition: 'all 0.4s ease',
            }}
          />

          {/* Teal hair - two buns on top */}
          <div
            style={{
              position: 'absolute',
              width: '160px',
              height: '80px',
              left: '50%',
              top: '0',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(180deg, #00C8AA 0%, #008877 50%, #006655 100%)',
              borderRadius: '50% 50% 40% 40% / 60% 60% 30% 30%',
              boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
            }}
          />
          {/* Left bun */}
          <div
            style={{
              position: 'absolute',
              width: '50px',
              height: '50px',
              left: '50%',
              top: '5px',
              transform: 'translateX(-50%) translateX(-35px)',
              background: 'radial-gradient(circle, #00E8CC 0%, #00AA99 50%, #006655 100%)',
              borderRadius: '50%',
              boxShadow: '0 3px 10px rgba(0,0,0,0.4), inset 0 -5px 10px rgba(0,0,0,0.2)',
            }}
          />
          {/* Right bun */}
          <div
            style={{
              position: 'absolute',
              width: '50px',
              height: '50px',
              left: '50%',
              top: '5px',
              transform: 'translateX(-50%) translateX(35px)',
              background: 'radial-gradient(circle, #00E8CC 0%, #00AA99 50%, #006655 100%)',
              borderRadius: '50%',
              boxShadow: '0 3px 10px rgba(0,0,0,0.4), inset 0 -5px 10px rgba(0,0,0,0.2)',
            }}
          />
          {/* Loose strands framing face */}
          <div
            style={{
              position: 'absolute',
              width: '25px',
              height: '60px',
              left: '50%',
              top: '25px',
              transform: 'translateX(-50%) translateX(-55px)',
              background: 'linear-gradient(90deg, #00C8AA 0%, #008877 100%)',
              borderRadius: '0 15px 15px 0',
              clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '25px',
              height: '60px',
              left: '50%',
              top: '25px',
              transform: 'translateX(-50%) translateX(55px)',
              background: 'linear-gradient(90deg, #008877 0%, #00C8AA 100%)',
              borderRadius: '15px 0 0 15px',
              clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)',
            }}
          />

        </div>

        {/* Body/Torso */}
        <div
          className="oracle-avatar-2d__body"
          style={{
            position: 'relative',
            width: '180px',
            height: '200px',
            margin: '0 auto',
            marginTop: '-20px',
          }}
        >
          {/* Neck */}
          <div
            style={{
              position: 'absolute',
              width: '50px',
              height: '40px',
              left: '50%',
              top: '0',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(180deg, #F5D5B8 0%, #E8C5A0 100%)',
              borderRadius: '0 0 25px 25px',
            }}
          />

          {/* Light blue bikini top */}
          <div
            style={{
              position: 'absolute',
              width: '90px',
              height: '50px',
              left: '50%',
              top: '35px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(180deg, #87CEEB 0%, #5FA8D0 100%)',
              borderRadius: '25px 25px 0 0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          />

          {/* Orange jacket - unzipped */}
          <div
            style={{
              position: 'absolute',
              width: '150px',
              height: '140px',
              left: '50%',
              top: '50px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(180deg, #FF8C42 0%, #FF6B1A 100%)',
              borderRadius: '20px 20px 0 0',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 48% 100%, 48% 0, 52% 0, 52% 100%, 0 100%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}
          />
          {/* Blue sleeves */}
          <div
            style={{
              position: 'absolute',
              width: '50px',
              height: '80px',
              left: '50%',
              top: '50px',
              transform: 'translateX(-50%) translateX(-75px)',
              background: 'linear-gradient(180deg, #0066CC 0%, #004499 100%)',
              borderRadius: '15px 0 0 0',
              boxShadow: 'inset 2px 0 5px rgba(0,0,0,0.3)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '50px',
              height: '80px',
              left: '50%',
              top: '50px',
              transform: 'translateX(-50%) translateX(75px)',
              background: 'linear-gradient(180deg, #0066CC 0%, #004499 100%)',
              borderRadius: '0 15px 0 0',
              boxShadow: 'inset -2px 0 5px rgba(0,0,0,0.3)',
            }}
          />
          {/* Ribbed cuffs */}
          <div
            style={{
              position: 'absolute',
              width: '45px',
              height: '12px',
              left: '50%',
              top: '120px',
              transform: 'translateX(-50%) translateX(-75px)',
              background: 'repeating-linear-gradient(0deg, #0066CC 0px, #0066CC 2px, #004499 2px, #004499 4px)',
              borderRadius: '0 0 8px 8px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '45px',
              height: '12px',
              left: '50%',
              top: '120px',
              transform: 'translateX(-50%) translateX(75px)',
              background: 'repeating-linear-gradient(0deg, #0066CC 0px, #0066CC 2px, #004499 2px, #004499 4px)',
              borderRadius: '0 0 8px 8px',
            }}
          />

          {/* Orange shorts */}
          <div
            style={{
              position: 'absolute',
              width: '130px',
              height: '60px',
              left: '50%',
              top: '180px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(180deg, #FF8C42 0%, #FF6B1A 100%)',
              borderRadius: '0 0 15px 15px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}
          />
          {/* Blue accents on shorts */}
          <div
            style={{
              position: 'absolute',
              width: '130px',
              height: '8px',
              left: '50%',
              top: '180px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(90deg, #0066CC 0%, #004499 100%)',
              borderRadius: '15px 15px 0 0',
            }}
          />

          {/* Utility belt with pouches */}
          <div
            style={{
              position: 'absolute',
              width: '140px',
              height: '20px',
              left: '50%',
              top: '170px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.5), inset 0 1px 3px rgba(255,255,255,0.1)',
            }}
          />
          {/* Pouches */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '25px',
                height: '30px',
                left: '50%',
                top: '175px',
                transform: `translateX(-50%) translateX(${-40 + i * 40}px)`,
                background: 'linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)',
                borderRadius: '5px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.1)',
                border: '1px solid #1a1a1a',
              }}
            >
              {/* Pouch flap */}
              <div
                style={{
                  position: 'absolute',
                  width: '27px',
                  height: '8px',
                  left: '-1px',
                  top: '-4px',
                  background: 'linear-gradient(180deg, #4a4a4a 0%, #3a3a3a 100%)',
                  borderRadius: '5px 5px 0 0',
                  border: '1px solid #1a1a1a',
                }}
              />
            </div>
          ))}
          {/* Yellow/orange strap hanging from pouch */}
          <div
            style={{
              position: 'absolute',
              width: '3px',
              height: '15px',
              left: '50%',
              top: '205px',
              transform: 'translateX(-50%) translateX(20px)',
              background: 'linear-gradient(180deg, #FFAA00 0%, #FF8800 100%)',
              borderRadius: '2px',
            }}
          />

          {/* Mechanical arm on back (right side) */}
          <div
            style={{
              position: 'absolute',
              width: '60px',
              height: '120px',
              left: '50%',
              top: '60px',
              transform: 'translateX(-50%) translateX(80px)',
              zIndex: 1,
              animation: 'mech-arm-sway 4s ease-in-out infinite',
            }}
          >
            {/* Arm segments */}
            <div
              style={{
                position: 'absolute',
                width: '25px',
                height: '80px',
                left: '50%',
                top: '0',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(180deg, #FFD700 0%, #CC9900 50%, #996600 100%)',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.2)',
                border: '2px solid #996600',
              }}
            />
            {/* Claw hand */}
            <div
              style={{
                position: 'absolute',
                width: '35px',
                height: '40px',
                left: '50%',
                top: '80px',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
                borderRadius: '0 0 20px 20px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.6)',
                border: '2px solid #333',
              }}
            >
              {/* Claw fingers */}
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '6px',
                    height: '20px',
                    left: '50%',
                    top: '35px',
                    transform: `translateX(-50%) translateX(${-8 + i * 8}px)`,
                    background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)',
                    borderRadius: '3px 3px 0 0',
                    clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Device in left hand */}
          <div
            style={{
              position: 'absolute',
              width: '20px',
              height: '35px',
              left: '50%',
              top: '120px',
              transform: 'translateX(-50%) translateX(-70px)',
              background: 'linear-gradient(180deg, #4a4a4a 0%, #2a2a2a 100%)',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.5), inset 0 1px 3px rgba(255,255,255,0.1)',
              border: '2px solid #1a1a1a',
            }}
          >
            {/* Sight attachment */}
            <div
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                left: '50%',
                top: '-4px',
                transform: 'translateX(-50%)',
                background: 'radial-gradient(circle, #00C8FF 0%, #0066AA 100%)',
                borderRadius: '50%',
                boxShadow: '0 0 8px rgba(0, 200, 255, 0.8)',
              }}
            />
          </div>

          {/* Wristbands */}
          <div
            style={{
              position: 'absolute',
              width: '45px',
              height: '8px',
              left: '50%',
              top: '115px',
              transform: 'translateX(-50%) translateX(-70px)',
              background: 'linear-gradient(90deg, #0066CC 0%, #004499 100%)',
              borderRadius: '4px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              left: '50%',
              top: '113px',
              transform: 'translateX(-50%) translateX(75px)',
              background: 'radial-gradient(circle, #FFD700 0%, #CC9900 100%)',
              borderRadius: '50%',
              boxShadow: '0 0 8px rgba(255, 215, 0, 0.6)',
              border: '2px solid #996600',
            }}
          />
        </div>
      </div>

      {/* Smoke effect layers */}
      <div
        ref={smokeRef}
        className="oracle-avatar-2d__smoke"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 3,
          opacity: config.opacity,
          transition: 'opacity 1s ease-in-out',
          pointerEvents: 'none',
        }}
      >
        {/* Multiple smoke layers for depth */}
        {Array.from({ length: Math.floor(config.density / 10) }).map((_, i) => {
          const offsetX = (i % 3) * 15 - 15
          const offsetY = (i % 2) * 10 - 5
          const rotation = i * 45
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: `${100 + i * 20}%`,
                height: `${100 + i * 15}%`,
                left: `${-i * 10}%`,
                top: `${-i * 5}%`,
                background: `radial-gradient(ellipse at ${50 + (i % 2) * 20}% ${40 + (i % 3) * 10}%, rgba(0, 200, 255, ${0.3 - i * 0.02}) 0%, rgba(0, 100, 150, ${0.2 - i * 0.01}) 40%, transparent 70%)`,
                borderRadius: '50%',
                animation: `smoke-float-${i % 4} ${4 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                filter: 'blur(20px)',
              }}
            />
          )
        })}

        {/* Halo effect for state D */}
        {smokeLevel === 'D' && (
          <div
            style={{
              position: 'absolute',
              width: '150%',
              height: '150%',
              left: '-25%',
              top: '-25%',
              background: 'radial-gradient(circle, transparent 40%, rgba(0, 200, 255, 0.1) 50%, transparent 60%)',
              borderRadius: '50%',
              animation: 'halo-rotate 8s linear infinite',
            }}
          />
        )}
      </div>

      {/* Animated sigils for state D */}
      {smokeLevel === 'D' && (
        <div
          className="oracle-avatar-2d__sigils"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '20px',
                height: '20px',
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                background: 'radial-gradient(circle, rgba(0, 200, 255, 0.8) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: `sigil-float ${3 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
                boxShadow: '0 0 10px rgba(0, 200, 255, 0.6)',
              }}
            />
          ))}
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes breathing {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }

        @keyframes mech-arm-sway {
          0%, 100% { transform: translateX(-50%) translateX(80px) rotate(15deg); }
          50% { transform: translateX(-50%) translateX(80px) rotate(18deg); }
        }

        @keyframes smoke-float-0 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
          25% { transform: translate(8px, -5px) rotate(90deg); opacity: 0.4; }
          50% { transform: translate(-6px, -8px) rotate(180deg); opacity: 0.5; }
          75% { transform: translate(-8px, 5px) rotate(270deg); opacity: 0.4; }
        }
        @keyframes smoke-float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
          25% { transform: translate(-8px, -6px) rotate(-90deg); opacity: 0.4; }
          50% { transform: translate(6px, -7px) rotate(-180deg); opacity: 0.5; }
          75% { transform: translate(8px, 4px) rotate(-270deg); opacity: 0.4; }
        }
        @keyframes smoke-float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
          25% { transform: translate(6px, 5px) rotate(90deg); opacity: 0.4; }
          50% { transform: translate(-8px, 6px) rotate(180deg); opacity: 0.5; }
          75% { transform: translate(-6px, -5px) rotate(270deg); opacity: 0.4; }
        }
        @keyframes smoke-float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
          25% { transform: translate(-6px, 6px) rotate(-90deg); opacity: 0.4; }
          50% { transform: translate(8px, 7px) rotate(-180deg); opacity: 0.5; }
          75% { transform: translate(6px, -4px) rotate(-270deg); opacity: 0.4; }
        }

        @keyframes halo-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes sigil-float {
          0%, 100% { 
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-20px) scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

