/**
 * Example: Using Ready Player Me with Oracle Canvas
 * 
 * This is an example component showing how to integrate Ready Player Me
 * avatars with your oracle character system.
 */

import { useState } from 'react'
import { OracleCanvas } from './OracleCanvas'
import { AvatarCreatorModal } from './AvatarCreatorModal'
import { useTarotGame } from '../../hooks/useTarotGame'

/**
 * Example 1: Basic usage with a Ready Player Me avatar ID
 */
export function OracleWithRPMBasic() {
  const { smokeLevel, expression } = useTarotGame()
  
  // Use a Ready Player Me avatar ID
  const avatarId = '64f7a8b9c8e4f1234567890a' // Replace with your avatar ID

  return (
    <OracleCanvas
      smokeLevel={smokeLevel}
      expression={expression}
      readyPlayerMeAvatar={avatarId}
    />
  )
}

/**
 * Example 2: Full integration with avatar creator
 */
export function OracleWithRPMModal() {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    // Load from localStorage if available
    localStorage.getItem('oracle-avatar-url') || undefined
  )
  const [isCreatorOpen, setIsCreatorOpen] = useState(false)
  const { smokeLevel, expression } = useTarotGame()

  const handleAvatarCreated = (url: string) => {
    setAvatarUrl(url)
    // Save to localStorage for persistence
    localStorage.setItem('oracle-avatar-url', url)
    console.log('Avatar created and saved:', url)
  }

  return (
    <div className="tarot-grid">
      <div style={{ position: 'relative' }}>
        <OracleCanvas
          smokeLevel={smokeLevel}
          expression={expression}
          readyPlayerMeAvatar={avatarUrl}
        />
        
        {/* Button to open avatar creator */}
        <button
          onClick={() => setIsCreatorOpen(true)}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            padding: '12px 24px',
            backgroundColor: '#127079',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0f5a61'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#127079'
          }}
        >
          Customize Avatar
        </button>
      </div>

      {/* Avatar Creator Modal */}
      <AvatarCreatorModal
        isOpen={isCreatorOpen}
        onClose={() => setIsCreatorOpen(false)}
        onAvatarCreated={handleAvatarCreated}
        bodyType="halfbody" // or "fullbody"
      />
    </div>
  )
}

/**
 * Example 3: Switching between custom GLB and Ready Player Me
 */
export function OracleWithSwitch() {
  const [useRPM, setUseRPM] = useState(false)
  const [rpmAvatarId, setRpmAvatarId] = useState<string>('')
  const { smokeLevel, expression } = useTarotGame()

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          <input
            type="checkbox"
            checked={useRPM}
            onChange={(e) => setUseRPM(e.target.checked)}
          />
          Use Ready Player Me Avatar
        </label>
        
        {useRPM && (
          <input
            type="text"
            placeholder="Enter RPM Avatar ID"
            value={rpmAvatarId}
            onChange={(e) => setRpmAvatarId(e.target.value)}
            style={{
              marginLeft: '10px',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        )}
      </div>

      <OracleCanvas
        smokeLevel={smokeLevel}
        expression={expression}
        readyPlayerMeAvatar={useRPM && rpmAvatarId ? rpmAvatarId : undefined}
      />
    </div>
  )
}

