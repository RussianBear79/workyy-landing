/**
 * Ready Player Me Integration Utilities
 * 
 * Helper functions for working with Ready Player Me avatars
 * Documentation: https://docs.readyplayer.me/
 */

export interface ReadyPlayerMeConfig {
  /** Your Ready Player Me subdomain (e.g., 'workyy') */
  subdomain: string
  /** Avatar creator URL template */
  creatorUrl?: string
  /** API endpoint for avatar operations */
  apiUrl?: string
}

/**
 * Default configuration
 * Replace 'workyy' with your actual Ready Player Me subdomain
 */
export const DEFAULT_RPM_CONFIG: ReadyPlayerMeConfig = {
  subdomain: 'workyy',
  creatorUrl: 'https://{subdomain}.readyplayer.me',
  apiUrl: 'https://api.readyplayer.me/v1',
}

/**
 * Generate a Ready Player Me avatar URL
 * 
 * @param avatarId - The avatar ID from Ready Player Me
 * @param options - Optional parameters for the avatar
 * @returns The full URL to the avatar GLB file
 * 
 * @example
 * getAvatarUrl('64f7a8b9c8e4f1234567890a', { quality: 'high', pose: 'T' })
 */
export function getAvatarUrl(
  avatarId: string,
  options: {
    quality?: 'low' | 'medium' | 'high'
    pose?: 'T' | 'A' | 'F'
    textureAtlas?: 'none' | '1024' | '2048' | '4096'
    textureSizeLimit?: number
    lod?: number
  } = {}
): string {
  const baseUrl = 'https://models.readyplayer.me'
  const params = new URLSearchParams()

  if (options.quality) {
    params.append('quality', options.quality)
  }
  if (options.pose) {
    params.append('pose', options.pose)
  }
  if (options.textureAtlas) {
    params.append('textureAtlas', options.textureAtlas)
  }
  if (options.textureSizeLimit) {
    params.append('textureSizeLimit', options.textureSizeLimit.toString())
  }
  if (options.lod !== undefined) {
    params.append('lod', options.lod.toString())
  }

  const queryString = params.toString()
  return `${baseUrl}/${avatarId}.glb${queryString ? `?${queryString}` : ''}`
}

/**
 * Get the avatar creator URL with optional parameters
 * 
 * @param config - Ready Player Me configuration
 * @param options - Optional parameters for the creator
 * @returns The full URL to the avatar creator
 * 
 * @example
 * getCreatorUrl(DEFAULT_RPM_CONFIG, { 
 *   clearCache: true,
 *   bodyType: 'fullbody',
 *   quickStart: true 
 * })
 */
export function getCreatorUrl(
  config: ReadyPlayerMeConfig = DEFAULT_RPM_CONFIG,
  options: {
    clearCache?: boolean
    bodyType?: 'fullbody' | 'halfbody'
    quickStart?: boolean
    frameTitle?: string
    frameRedirectUrl?: string
    frameIcon?: string
  } = {}
): string {
  const baseUrl = config.creatorUrl?.replace('{subdomain}', config.subdomain) || 
                  `https://${config.subdomain}.readyplayer.me`
  
  const params = new URLSearchParams()
  
  if (options.clearCache) {
    params.append('clearCache', 'true')
  }
  if (options.bodyType) {
    params.append('bodyType', options.bodyType)
  }
  if (options.quickStart) {
    params.append('quickStart', 'true')
  }
  if (options.frameTitle) {
    params.append('frameTitle', options.frameTitle)
  }
  if (options.frameRedirectUrl) {
    params.append('frameRedirectUrl', options.frameRedirectUrl)
  }
  if (options.frameIcon) {
    params.append('frameIcon', options.frameIcon)
  }

  const queryString = params.toString()
  return `${baseUrl}${queryString ? `?${queryString}` : ''}`
}

/**
 * Extract avatar ID from a Ready Player Me URL
 * 
 * @param url - Full URL or just the avatar ID
 * @returns The avatar ID
 * 
 * @example
 * extractAvatarId('https://models.readyplayer.me/64f7a8b9c8e4f1234567890a.glb')
 * // Returns: '64f7a8b9c8e4f1234567890a'
 */
export function extractAvatarId(url: string): string | null {
  // If it's already just an ID
  if (!url.includes('/') && !url.includes('.')) {
    return url
  }

  // Extract from URL pattern: .../avatarId.glb
  const match = url.match(/\/([a-f0-9]{24})\.glb/i)
  if (match) {
    return match[1]
  }

  // Try to extract from any URL format
  const parts = url.split('/')
  const lastPart = parts[parts.length - 1]
  const idMatch = lastPart.match(/^([a-f0-9]{24})/i)
  
  return idMatch ? idMatch[1] : null
}

/**
 * Validate if a string looks like a Ready Player Me avatar ID
 * 
 * @param id - The ID to validate
 * @returns True if it looks like a valid avatar ID
 */
export function isValidAvatarId(id: string): boolean {
  // Ready Player Me avatar IDs are typically 24-character hex strings
  return /^[a-f0-9]{24}$/i.test(id)
}

/**
 * Get avatar metadata from Ready Player Me API
 * Note: This requires API authentication
 * 
 * @param avatarId - The avatar ID
 * @param config - Ready Player Me configuration
 * @returns Promise with avatar metadata
 */
export async function getAvatarMetadata(
  avatarId: string,
  config: ReadyPlayerMeConfig = DEFAULT_RPM_CONFIG
): Promise<any> {
  const apiUrl = config.apiUrl || 'https://api.readyplayer.me/v1'
  const response = await fetch(`${apiUrl}/avatars/${avatarId}`)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch avatar metadata: ${response.statusText}`)
  }
  
  return response.json()
}

/**
 * Create a Ready Player Me avatar URL with optimized settings for web
 * 
 * @param avatarId - The avatar ID
 * @returns Optimized avatar URL for web use
 */
export function getOptimizedAvatarUrl(avatarId: string): string {
  return getAvatarUrl(avatarId, {
    quality: 'high',
    textureAtlas: '2048',
    lod: 0, // Highest detail
  })
}

/**
 * Create a Ready Player Me avatar URL optimized for performance
 * 
 * @param avatarId - The avatar ID
 * @returns Performance-optimized avatar URL
 */
export function getPerformanceAvatarUrl(avatarId: string): string {
  return getAvatarUrl(avatarId, {
    quality: 'medium',
    textureAtlas: '1024',
    lod: 1, // Medium detail
  })
}

