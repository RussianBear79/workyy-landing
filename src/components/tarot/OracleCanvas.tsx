import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useAnimations, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { OracleExpression } from '../../hooks/useTarotGame'

type SmokeState = 'A' | 'B' | 'C' | 'D'

interface OracleCanvasProps {
  smokeLevel: SmokeState
  expression: OracleExpression
}

const expressionClip: Record<OracleExpression, string | null> = {
  neutral: null,
  smile: 'Smile',
  sad: 'Sad',
  smirk: 'SlySmirk',
}

// Placeholder character (shows when GLB is missing)
function PlaceholderOracle({ smokeLevel }: { smokeLevel: SmokeState }) {
  const groupRef = useRef<THREE.Group>(null)
  const config = {
    A: { opacity: 0.75 },
    B: { opacity: 0.55 },
    C: { opacity: 0.35 },
    D: { opacity: 0.2 },
  }[smokeLevel]

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.05
      groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Head */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#e6c79a" metalness={0.1} roughness={0.7} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.12, 0.55, 0.35]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#1a0a0a" />
      </mesh>
      <mesh position={[0.12, 0.55, 0.35]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#1a0a0a" />
      </mesh>
      {/* Body */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[0.5, 0.6, 0.3]} />
        <meshStandardMaterial color="#0f4c75" metalness={0.3} roughness={0.6} />
      </mesh>
      {/* Smoke particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={new Float32Array(
              Array.from({ length: 300 }, () => (Math.random() - 0.5) * 2)
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#18c5ff"
          size={0.2 * config.opacity}
          transparent
          opacity={config.opacity}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

function OracleModel({ smokeLevel, expression }: OracleCanvasProps) {
  // Load model - will throw error if file doesn't exist, caught by Suspense
  const { scene, animations } = useGLTF('/models/oracle.glb')
  const { actions } = useAnimations(animations, scene)
  
  useEffect(() => {
    console.log('✅ Oracle model loaded', { 
      animations: animations.length,
      availableActions: Object.keys(actions).filter(k => actions[k] !== null)
    })
  }, [animations, actions])

  // Play idle animation
  useEffect(() => {
    const idleAction = actions['Idle'] || actions['idle'] || actions['Idle_Loop']
    if (idleAction) {
      idleAction.reset().fadeIn(0.5).play()
      return () => {
        idleAction.fadeOut(0.3)
      }
    }
  }, [actions])

  // Handle smoke state transitions
  useEffect(() => {
    const smokeClips = ['Smoke_A', 'Smoke_B', 'Smoke_C', 'Smoke_D']
    smokeClips.forEach((clipName) => {
      const action = actions[clipName]
      if (action) {
        if (clipName === `Smoke_${smokeLevel}`) {
          action.reset().fadeIn(0.6).play()
        } else {
          action.fadeOut(0.4)
        }
      }
    })
  }, [actions, smokeLevel])

  // Handle expression morphs
  useEffect(() => {
    const clipName = expressionClip[expression]
    const expressionClips = ['Smile', 'Sad', 'SlySmirk']
    expressionClips.forEach((clip) => {
      const action = actions[clip]
      if (action) {
        if (clip === clipName) {
          action.reset().fadeIn(0.3).play()
        } else {
          action.fadeOut(0.2)
        }
      }
    })
  }, [actions, expression])

  // Adjust smoke density via material properties if available
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const material = child.material as THREE.MeshStandardMaterial
        if (material.name?.includes('smoke') || material.name?.includes('Smoke')) {
          const config = {
            A: { opacity: 0.75, emissiveIntensity: 0.8 },
            B: { opacity: 0.55, emissiveIntensity: 0.6 },
            C: { opacity: 0.35, emissiveIntensity: 0.4 },
            D: { opacity: 0.2, emissiveIntensity: 0.2 },
          }[smokeLevel]
          if (material.transparent !== undefined) {
            material.transparent = true
            material.opacity = config.opacity
          }
          if (material.emissive) {
            material.emissiveIntensity = config.emissiveIntensity
          }
        }
      }
    })
  }, [scene, smokeLevel])

  return <primitive object={scene} position={[0, -1, 0]} scale={[1, 1, 1]} />
}

// Fallback component with logging
function ModelFallback({ smokeLevel }: { smokeLevel: SmokeState }) {
  useEffect(() => {
    console.warn('⚠️ Oracle model not found - showing placeholder')
    console.log('📝 To add a model: Place oracle.glb in public/models/')
    console.log('📖 See public/models/QUICK_START.md for instructions')
  }, [])
  return <PlaceholderOracle smokeLevel={smokeLevel} />
}

// Error boundary wrapper
function OracleModelWrapper(props: OracleCanvasProps) {
  useEffect(() => {
    console.log('🔮 Attempting to load oracle model from /models/oracle.glb')
  }, [])
  
  return (
    <Suspense fallback={<ModelFallback smokeLevel={props.smokeLevel} />}>
      <OracleModel {...props} />
    </Suspense>
  )
}

export function OracleCanvas(props: OracleCanvasProps) {
  return (
    <div className="oracle-canvas" style={{ position: 'relative' }}>
      <Canvas camera={{ position: [0, 1.2, 3], fov: 45 }}>
        <color attach="background" args={['#030617']} />
        <hemisphereLight intensity={0.4} color="#49d5ff" groundColor="#0a0b15" />
        <spotLight
          position={[1.5, 2.5, 1.5]}
          intensity={1.8}
          angle={0.5}
          color="#f4c58a"
          penumbra={0.6}
        />
        <pointLight position={[-1.2, 1.2, 1.2]} intensity={0.5} color="#18c5ff" />
        <pointLight position={[0, 2, -1.5]} intensity={0.4} color="#18c5ff" />
        <OracleModelWrapper {...props} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
    </div>
  )
}

// Try to preload, but don't fail if missing
try {
  useGLTF.preload('/models/oracle.glb')
} catch {
  // File doesn't exist yet - that's okay
}
