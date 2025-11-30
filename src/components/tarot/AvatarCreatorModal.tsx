import { useEffect, useState } from 'react'
import { getCreatorUrl, type ReadyPlayerMeConfig, DEFAULT_RPM_CONFIG } from '../../utils/readyPlayerMe'

interface AvatarCreatorModalProps {
  isOpen: boolean
  onClose: () => void
  onAvatarCreated?: (avatarUrl: string) => void
  config?: ReadyPlayerMeConfig
  bodyType?: 'fullbody' | 'halfbody'
}

/**
 * Avatar Creator Modal Component
 * 
 * Embeds the Ready Player Me avatar creator in an iframe modal.
 * Users can create and customize avatars, and the component will
 * handle the callback when an avatar is created.
 * 
 * @example
 * <AvatarCreatorModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onAvatarCreated={(url) => console.log('Avatar created:', url)}
 * />
 */
export function AvatarCreatorModal({
  isOpen,
  onClose,
  onAvatarCreated,
  config = DEFAULT_RPM_CONFIG,
  bodyType = 'halfbody',
}: AvatarCreatorModalProps) {
  const [iframeKey, setIframeKey] = useState(0)

  // Reset iframe when modal opens to ensure fresh state
  useEffect(() => {
    if (isOpen) {
      setIframeKey((prev) => prev + 1)
    }
  }, [isOpen])

  // Listen for messages from the Ready Player Me iframe
  useEffect(() => {
    if (!isOpen) return

    const handleMessage = (event: MessageEvent) => {
      // Verify origin for security (adjust to your Ready Player Me subdomain)
      const allowedOrigin = `https://${config.subdomain}.readyplayer.me`
      if (event.origin !== allowedOrigin) {
        return
      }

      // Handle avatar creation callback
      if (event.data?.source === 'readyplayerme' && event.data?.eventName === 'v1.avatar.created') {
        const avatarUrl = event.data.avatarUrl || event.data.data?.url
        if (avatarUrl && onAvatarCreated) {
          onAvatarCreated(avatarUrl)
          onClose()
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [isOpen, config.subdomain, onAvatarCreated, onClose])

  if (!isOpen) return null

  const creatorUrl = getCreatorUrl(config, {
    bodyType,
    quickStart: true,
    frameTitle: 'Create Your Oracle Avatar',
    frameRedirectUrl: window.location.origin,
  })

  return (
    <div
      className="avatar-creator-modal"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
      }}
      onClick={(e) => {
        // Close when clicking outside the iframe
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          height: '90vh',
          maxHeight: '700px',
          backgroundColor: '#1a1a1a',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
          }}
          aria-label="Close avatar creator"
        >
          ×
        </button>

        {/* Ready Player Me iframe */}
        <iframe
          key={iframeKey}
          src={creatorUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '12px',
          }}
          title="Ready Player Me Avatar Creator"
          allow="camera; microphone"
        />
      </div>
    </div>
  )
}

