# Ready Player Me Integration Guide

This guide explains how to integrate Ready Player Me avatars into your oracle character system.

## Overview

Ready Player Me provides cross-platform avatar solutions that can be used to create and display customizable 3D avatars. This integration allows you to:

1. **Use Ready Player Me avatars** instead of (or alongside) custom GLB models
2. **Embed the avatar creator** so users can create their own oracle avatars
3. **Load avatars dynamically** from Ready Player Me's API

## Setup

### 1. Get a Ready Player Me Account

1. Sign up at [https://readyplayer.me](https://readyplayer.me)
2. Create a project to get your subdomain (e.g., `workyy`)
3. Configure your avatar creator settings

### 2. Update Configuration

Edit `src/utils/readyPlayerMe.ts` and update the `DEFAULT_RPM_CONFIG`:

```typescript
export const DEFAULT_RPM_CONFIG: ReadyPlayerMeConfig = {
  subdomain: 'your-subdomain', // Replace with your subdomain
  creatorUrl: 'https://{subdomain}.readyplayer.me',
  apiUrl: 'https://api.readyplayer.me/v1',
}
```

## Usage

### Basic Usage: Using a Ready Player Me Avatar

Update `OracleCanvas` to use a Ready Player Me avatar:

```tsx
import { OracleCanvas } from './components/tarot/OracleCanvas'

// Option 1: Use avatar ID
<OracleCanvas 
  smokeLevel="A"
  expression="neutral"
  readyPlayerMeAvatar="64f7a8b9c8e4f1234567890a"
/>

// Option 2: Use full URL
<OracleCanvas 
  smokeLevel="A"
  expression="neutral"
  readyPlayerMeAvatar="https://models.readyplayer.me/64f7a8b9c8e4f1234567890a.glb"
/>
```

### Advanced: Avatar Creator Modal

Allow users to create their own avatars:

```tsx
import { useState } from 'react'
import { AvatarCreatorModal } from './components/tarot/AvatarCreatorModal'
import { OracleCanvas } from './components/tarot/OracleCanvas'

function TarotPage() {
  const [isCreatorOpen, setIsCreatorOpen] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>()

  return (
    <>
      <button onClick={() => setIsCreatorOpen(true)}>
        Create Your Oracle Avatar
      </button>

      <AvatarCreatorModal
        isOpen={isCreatorOpen}
        onClose={() => setIsCreatorOpen(false)}
        onAvatarCreated={(url) => {
          setAvatarUrl(url)
          console.log('Avatar created:', url)
        }}
      />

      <OracleCanvas
        smokeLevel="A"
        expression="neutral"
        readyPlayerMeAvatar={avatarUrl}
      />
    </>
  )
}
```

### Utility Functions

Use helper functions from `src/utils/readyPlayerMe.ts`:

```typescript
import { 
  getAvatarUrl, 
  getOptimizedAvatarUrl,
  getPerformanceAvatarUrl,
  extractAvatarId 
} from './utils/readyPlayerMe'

// Get optimized avatar URL for web
const avatarUrl = getOptimizedAvatarUrl('64f7a8b9c8e4f1234567890a')

// Get performance-optimized URL (lower quality, faster load)
const perfUrl = getPerformanceAvatarUrl('64f7a8b9c8e4f1234567890a')

// Extract avatar ID from URL
const id = extractAvatarId('https://models.readyplayer.me/64f7a8b9c8e4f1234567890a.glb')
// Returns: '64f7a8b9c8e4f1234567890a'
```

## Avatar URL Parameters

Ready Player Me supports various URL parameters for customization:

- `quality`: `low` | `medium` | `high` - Texture quality
- `pose`: `T` | `A` | `F` - Avatar pose (T-pose, A-pose, Full body)
- `textureAtlas`: `none` | `1024` | `2048` | `4096` - Texture atlas size
- `lod`: `0` | `1` | `2` - Level of detail (0 = highest)

Example:
```typescript
const url = getAvatarUrl('avatar-id', {
  quality: 'high',
  textureAtlas: '2048',
  lod: 0
})
```

## Integration with Existing Oracle System

The Ready Player Me integration is designed to work seamlessly with your existing oracle system:

1. **Smoke States**: Ready Player Me avatars respect the `smokeLevel` prop and apply opacity/emissive effects
2. **Expressions**: Uses blendshapes for expressions (smile, sad, smirk)
3. **Animations**: Supports idle animations and can work with your existing animation system

## Customization

### Styling the Avatar

Ready Player Me avatars can be customized through:
- **Avatar Creator**: Users customize in the creator modal
- **API**: Programmatically update avatar assets (requires API access)
- **Materials**: Modify materials in Three.js after loading

Example material customization:
```typescript
// In ReadyPlayerMeAvatar.tsx, you can customize materials:
scene.traverse((child) => {
  if (child instanceof THREE.Mesh) {
    // Apply custom materials, colors, etc.
  }
})
```

### Expression Mapping

Map your oracle expressions to Ready Player Me blendshapes:

```typescript
// In ReadyPlayerMeAvatar.tsx
const expressionMap: Record<OracleExpression, string[]> = {
  neutral: [],
  smile: ['mouthSmile', 'eyeSquintLeft', 'eyeSquintRight'],
  sad: ['mouthFrown', 'browInnerUp'],
  smirk: ['mouthSmileLeft', 'eyeSquintLeft'],
}
```

Common Ready Player Me blendshape names:
- `mouthSmile`, `mouthSmileLeft`, `mouthSmileRight`
- `mouthFrown`, `mouthFrownLeft`, `mouthFrownRight`
- `eyeSquintLeft`, `eyeSquintRight`
- `browInnerUp`, `browOuterUpLeft`, `browOuterUpRight`

## Performance Considerations

1. **Preload Avatars**: Preload frequently used avatars
   ```typescript
   import { preloadReadyPlayerMeAvatar } from './components/tarot/ReadyPlayerMeAvatar'
   preloadReadyPlayerMeAvatar(avatarUrl)
   ```

2. **Use LOD**: Use lower LOD for distant or less important avatars
   ```typescript
   const perfUrl = getAvatarUrl(avatarId, { lod: 1 })
   ```

3. **Texture Optimization**: Use appropriate texture atlas sizes
   - `1024`: Good for mobile/performance
   - `2048`: Balanced (recommended)
   - `4096`: High quality (desktop only)

## Troubleshooting

### Avatar Not Loading

1. **Check URL**: Verify the avatar URL is correct
2. **CORS**: Ensure Ready Player Me allows your domain (check your RPM dashboard)
3. **Network**: Check browser console for network errors

### Expressions Not Working

1. **Blendshapes**: Verify the blendshape names match Ready Player Me's naming
2. **Model**: Some Ready Player Me models may not have all blendshapes
3. **Debug**: Log `morphTargetDictionary` to see available blendshapes

### Creator Modal Not Working

1. **Subdomain**: Verify your subdomain is correct in config
2. **Message Listener**: Check browser console for message events
3. **Iframe**: Ensure iframe is not blocked by browser extensions

## Next Steps

1. **Create Test Avatar**: Use the avatar creator to create a test avatar
2. **Get Avatar ID**: Copy the avatar ID from the URL
3. **Test Integration**: Use the avatar ID in `OracleCanvas`
4. **Customize**: Adjust expressions, materials, and animations as needed

## Resources

- [Ready Player Me Documentation](https://docs.readyplayer.me/)
- [Avatar API Reference](https://docs.readyplayer.me/ready-player-me/api-reference/avatar-api)
- [Web Integration Guide](https://docs.readyplayer.me/ready-player-me/integration-guides/web-and-native-integration/avatar-creator-integration)

## Example: Complete Integration

```tsx
import { useState } from 'react'
import { OracleCanvas } from './components/tarot/OracleCanvas'
import { AvatarCreatorModal } from './components/tarot/AvatarCreatorModal'
import { useTarotGame } from './hooks/useTarotGame'

export function TarotGameWithRPM() {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    localStorage.getItem('oracle-avatar-url') || undefined
  )
  const [isCreatorOpen, setIsCreatorOpen] = useState(false)
  const { smokeLevel, expression } = useTarotGame()

  const handleAvatarCreated = (url: string) => {
    setAvatarUrl(url)
    localStorage.setItem('oracle-avatar-url', url)
  }

  return (
    <div className="tarot-grid">
      <div style={{ position: 'relative' }}>
        <OracleCanvas
          smokeLevel={smokeLevel}
          expression={expression}
          readyPlayerMeAvatar={avatarUrl}
        />
        <button
          onClick={() => setIsCreatorOpen(true)}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            padding: '10px 20px',
            backgroundColor: '#127079',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Customize Avatar
        </button>
      </div>

      <AvatarCreatorModal
        isOpen={isCreatorOpen}
        onClose={() => setIsCreatorOpen(false)}
        onAvatarCreated={handleAvatarCreated}
      />
    </div>
  )
}
```

