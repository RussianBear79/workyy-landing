# Download Ready Player Me Avatar

## The Problem

Ready Player Me's CDN blocks requests from localhost/development domains due to CORS (Cross-Origin Resource Sharing) policies. This causes "Failed to fetch" errors.

## The Solution

Download the avatar GLB file and host it locally. This bypasses CORS entirely.

## Quick Steps

### Option 1: Using the Script (Recommended)

1. Run the download script:
   ```bash
   node scripts/download-rpm-avatar.js
   ```

2. The avatar will be saved to: `public/models/oracle-rpm.glb`

3. Update `TarotGame.tsx`:
   - Set `useLocalModel = true`
   - The component will automatically use the local file

### Option 2: Manual Download

1. Open this URL in your browser:
   ```
   https://models.readyplayer.me/6929802a5f9f523e5044ae48.glb
   ```

2. The browser will download the GLB file

3. Save it to: `public/models/oracle-rpm.glb`

4. Update `TarotGame.tsx` to use the local model

### Option 3: Use wget or curl

```bash
# Windows (PowerShell)
Invoke-WebRequest -Uri "https://models.readyplayer.me/6929802a5f9f523e5044ae48.glb" -OutFile "public/models/oracle-rpm.glb"

# Mac/Linux
wget https://models.readyplayer.me/6929802a5f9f523e5044ae48.glb -O public/models/oracle-rpm.glb

# Or with curl
curl -o public/models/oracle-rpm.glb https://models.readyplayer.me/6929802a5f9f523e5044ae48.glb
```

## After Downloading

The local GLB file will be served from your Vite dev server, which doesn't have CORS restrictions. The avatar should load immediately!

## File Size

The GLB file is typically 1-5 MB, so it won't significantly impact your bundle size.

