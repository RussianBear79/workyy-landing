import { Suspense } from 'react'
import { OracleCanvas } from './OracleCanvas'
import { TarotUI } from './TarotUI'
import { useTarotGame } from '../../hooks/useTarotGame'
import { AvatarLoaderTest } from './AvatarLoaderTest'
import { extractAvatarId } from '../../utils/readyPlayerMe'

export function TarotGame() {
  const {
    state,
    smokeLevel,
    expression,
    cards,
    cardMeanings,
    summary,
    drawPast,
    drawPresent,
    drawFuture,
    reset,
  } = useTarotGame()

  // CORS FIX: Use local GLB file instead of loading from Ready Player Me CDN
  // The CDN blocks requests from localhost due to CORS policy
  // 
  // To fix: Download the avatar manually:
  // 1. Open: https://models.readyplayer.me/6929802a5f9f523e5044ae48.glb
  // 2. Save the file to: public/models/oracle-rpm.glb
  // 3. Change useLocalModel to true below
  
  const useLocalModel = false // Change to true after downloading the file
  const avatarId = '6929802a5f9f523e5044ae48'
  const avatarUrl = `https://models.readyplayer.me/${avatarId}.glb`

  return (
    <div className="tarot-grid">
      {/* Diagnostic component - shows CORS error in dev mode */}
      {process.env.NODE_ENV === 'development' && !useLocalModel && (
        <AvatarLoaderTest avatarUrl={avatarUrl} />
      )}
      <Suspense fallback={<div className="oracle-canvas oracle-canvas--loading">Summoning oracle…</div>}>
        <OracleCanvas 
          smokeLevel={smokeLevel} 
          expression={expression}
          // If useLocalModel is true, it will load /models/oracle-rpm.glb
          // Otherwise, it tries Ready Player Me (will fail due to CORS)
          readyPlayerMeAvatar={useLocalModel ? undefined : avatarId}
        />
      </Suspense>
      <TarotUI
        phase={state.phase}
        cards={cards}
        meanings={cardMeanings as Record<'past' | 'present' | 'future', string | undefined>}
        summary={summary}
        onDrawPast={drawPast}
        onDrawPresent={drawPresent}
        onDrawFuture={drawFuture}
        onReset={reset}
      />
    </div>
  )
}


