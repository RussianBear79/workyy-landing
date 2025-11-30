import type { OracleExpression } from '../../hooks/useTarotGame'
import { OracleAvatar2D } from './OracleAvatar2D'

type SmokeState = 'A' | 'B' | 'C' | 'D'

interface OracleCanvasProps {
  smokeLevel: SmokeState
  expression: OracleExpression
  /** Optional Ready Player Me avatar URL or ID. (Deprecated - now using 2D avatar) */
  readyPlayerMeAvatar?: string
}


export function OracleCanvas(props: OracleCanvasProps) {
  return (
    <div 
      className="oracle-canvas" 
      style={{ 
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '500px',
      }}
    >
      <OracleAvatar2D smokeLevel={props.smokeLevel} expression={props.expression} />
    </div>
  )
}
