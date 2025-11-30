/**
 * Diagnostic component to test Ready Player Me avatar loading
 * This helps identify CORS, network, or URL issues
 */

import { useEffect, useState } from 'react'

interface AvatarLoaderTestProps {
  avatarUrl: string
}

export function AvatarLoaderTest({ avatarUrl }: AvatarLoaderTestProps) {
  const [status, setStatus] = useState<{
    loading: boolean
    success: boolean
    error: string | null
    details: any
  }>({
    loading: true,
    success: false,
    error: null,
    details: null,
  })

  useEffect(() => {
    console.log('🧪 Testing avatar URL:', avatarUrl)
    
    // Test if the URL is accessible
    fetch(avatarUrl, { method: 'HEAD', mode: 'cors' })
      .then((response) => {
        console.log('✅ Avatar URL is accessible:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
        })
        setStatus({
          loading: false,
          success: true,
          error: null,
          details: {
            status: response.status,
            contentType: response.headers.get('content-type'),
            contentLength: response.headers.get('content-length'),
          },
        })
      })
      .catch((error) => {
        console.error('❌ Avatar URL test failed:', error)
        setStatus({
          loading: false,
          success: false,
          error: error.message,
          details: {
            name: error.name,
            stack: error.stack,
          },
        })
      })
  }, [avatarUrl])

  if (status.loading) {
    return (
      <div style={{ padding: '20px', background: '#1a1a1a', color: '#fff', borderRadius: '8px' }}>
        <p>🧪 Testing avatar URL...</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', background: '#1a1a1a', color: '#fff', borderRadius: '8px', margin: '10px' }}>
      {status.success ? (
        <div>
          <p style={{ color: '#4ade80' }}>✅ Avatar URL is accessible!</p>
          <pre style={{ fontSize: '12px', overflow: 'auto' }}>
            {JSON.stringify(status.details, null, 2)}
          </pre>
        </div>
      ) : (
        <div>
          <p style={{ color: '#f87171' }}>❌ Avatar URL test failed</p>
          <p>Error: {status.error}</p>
          {status.error?.includes('CORS') && (
            <div style={{ marginTop: '10px', padding: '10px', background: '#7c2d12', borderRadius: '4px' }}>
              <p><strong>CORS Error Detected</strong></p>
              <p>Ready Player Me may not allow requests from this origin.</p>
              <p>Possible solutions:</p>
              <ul>
                <li>Use a CORS proxy</li>
                <li>Download the GLB file and host it locally</li>
                <li>Check Ready Player Me CORS settings</li>
              </ul>
            </div>
          )}
          <pre style={{ fontSize: '12px', overflow: 'auto' }}>
            {JSON.stringify(status.details, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

