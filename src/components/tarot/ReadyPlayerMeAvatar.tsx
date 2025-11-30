import React, { Suspense, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { OracleExpression } from '../../hooks/useTarotGame'

type SmokeState = 'A' | 'B' | 'C' | 'D'

interface ReadyPlayerMeAvatarProps {
  avatarUrl: string
  smokeLevel: SmokeState
  expression: OracleExpression
  position?: [number, number, number]
  scale?: [number, number, number]
}

/**
 * Ready Player Me Avatar Component
 * 
 * Loads and displays a Ready Player Me avatar from their API.
 * The avatarUrl should be a Ready Player Me avatar URL (e.g., https://models.readyplayer.me/{avatarId}.glb)
 * 
 * @example
 * <ReadyPlayerMeAvatar 
 *   avatarUrl="https://models.readyplayer.me/64f7a8b9c8e4f1234567890a.glb"
 *   smokeLevel="A"
 *   expression="neutral"
 * />
 */
function ReadyPlayerMeModel({ 
  avatarUrl, 
  smokeLevel, 
  expression,
  position = [0, -1, 0],
  scale = [1, 1, 1]
}: ReadyPlayerMeAvatarProps) {
  // Log the URL being loaded for debugging
  useEffect(() => {
    console.log('🔮 Loading Ready Player Me avatar from:', avatarUrl)
    console.log('🔮 Avatar URL details:', {
      url: avatarUrl,
      isValid: avatarUrl.startsWith('http'),
      isGLB: avatarUrl.endsWith('.glb'),
    })
  }, [avatarUrl])

  const { scene } = useGLTF(avatarUrl)
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (scene) {
      console.log('✅ Ready Player Me avatar loaded successfully', {
        scene,
        children: scene.children.length,
        hasMeshes: scene.children.some(child => child instanceof THREE.Mesh),
        position: scene.position,
        scale: scene.scale,
      })
      
      // Log scene hierarchy for debugging
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          console.log('  📦 Mesh found:', child.name || 'unnamed', {
            geometry: child.geometry.type,
            material: child.material.type,
          })
        }
      })
    }
  }, [scene])

  // Apply smoke effects to materials
  useEffect(() => {
    const config = {
      A: { opacity: 0.75, emissiveIntensity: 0.8 },
      B: { opacity: 0.55, emissiveIntensity: 0.6 },
      C: { opacity: 0.35, emissiveIntensity: 0.4 },
      D: { opacity: 0.2, emissiveIntensity: 0.2 },
    }[smokeLevel]

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const material = child.material as THREE.MeshStandardMaterial
        // Apply smoke-like effects (you can customize this based on your needs)
        if (material.transparent !== undefined) {
          material.transparent = true
          material.opacity = Math.min(material.opacity || 1, config.opacity)
        }
        if (material.emissive) {
          material.emissiveIntensity = config.emissiveIntensity
        }
      }
    })
  }, [scene, smokeLevel])

  // Subtle idle animation
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle breathing/sway animation
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.05
      groupRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.8) * 0.02
    }
  })

  // Handle expression via blendshapes if available
  useEffect(() => {
    // Ready Player Me avatars support blendshapes
    // You can map expressions to blendshape names
    const expressionMap: Record<OracleExpression, string[]> = {
      neutral: [],
      smile: ['mouthSmile', 'eyeSquintLeft', 'eyeSquintRight'],
      sad: ['mouthFrown', 'browInnerUp'],
      smirk: ['mouthSmileLeft', 'eyeSquintLeft'],
    }

    const blendshapeNames = expressionMap[expression]
    if (blendshapeNames.length === 0) return

    scene.traverse((child) => {
      if (child instanceof THREE.SkinnedMesh && child.morphTargetDictionary) {
        blendshapeNames.forEach((name) => {
          const index = child.morphTargetDictionary?.[name]
          if (index !== undefined && child.morphTargetInfluences) {
            child.morphTargetInfluences[index] = 1.0
          }
        })
      }
    })
  }, [scene, expression])

  // Ensure scene is visible
  useEffect(() => {
    if (scene) {
      // Make sure the scene is visible
      scene.visible = true
      scene.traverse((child) => {
        child.visible = true
        if (child instanceof THREE.Mesh) {
          child.frustumCulled = false // Ensure it's not culled
        }
      })
    }
  }, [scene])

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}

/**
 * Fallback component when avatar fails to load
 */
function AvatarFallback({ smokeLevel }: { smokeLevel: SmokeState }) {
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
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color="#e6c79a" 
          metalness={0.1} 
          roughness={0.7}
          transparent
          opacity={config.opacity}
        />
      </mesh>
      <mesh position={[-0.12, 0.55, 0.35]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#1a0a0a" />
      </mesh>
      <mesh position={[0.12, 0.55, 0.35]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#1a0a0a" />
      </mesh>
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[0.5, 0.6, 0.3]} />
        <meshStandardMaterial 
          color="#0f4c75" 
          metalness={0.3} 
          roughness={0.6}
          transparent
          opacity={config.opacity}
        />
      </mesh>
    </group>
  )
}

/**
 * Error boundary for Ready Player Me avatar loading errors
 */
class ReadyPlayerMeErrorBoundary extends React.Component<
  { children: React.ReactNode; smokeLevel: SmokeState; avatarUrl: string },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('❌ Ready Player Me Avatar Error:', error)
    console.error('Error Info:', errorInfo)
    console.error('Avatar URL:', this.props.avatarUrl)
    
    // Check for common issues
    if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
      console.warn('⚠️ CORS Error: Ready Player Me may not allow requests from this origin')
      console.warn('💡 Solution: The avatar URL might need to be accessed differently, or CORS headers need to be configured')
    }
  }

  render() {
    if (this.state.hasError) {
      console.warn('⚠️ Showing fallback due to error:', this.state.error?.message)
      return <AvatarFallback smokeLevel={this.props.smokeLevel} />
    }
    return this.props.children
  }
}

/**
 * Ready Player Me Avatar Component with Suspense boundary
 */
export function ReadyPlayerMeAvatar(props: ReadyPlayerMeAvatarProps) {
  return (
    <ReadyPlayerMeErrorBoundary smokeLevel={props.smokeLevel} avatarUrl={props.avatarUrl}>
      <Suspense fallback={<AvatarFallback smokeLevel={props.smokeLevel} />}>
        <ReadyPlayerMeModel {...props} />
      </Suspense>
    </ReadyPlayerMeErrorBoundary>
  )
}

/**
 * Preload a Ready Player Me avatar
 */
export function preloadReadyPlayerMeAvatar(avatarUrl: string) {
  try {
    useGLTF.preload(avatarUrl)
  } catch (error) {
    console.warn('Failed to preload Ready Player Me avatar:', error)
  }
}

