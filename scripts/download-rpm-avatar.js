/**
 * Script to download Ready Player Me avatar and save it locally
 * Run with: node scripts/download-rpm-avatar.js
 */

import https from 'https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const avatarId = '6929802a5f9f523e5044ae48'
const avatarUrl = `https://models.readyplayer.me/${avatarId}.glb`
const outputPath = path.join(__dirname, '..', 'public', 'models', 'oracle-rpm.glb')

// Ensure directory exists
const outputDir = path.dirname(outputPath)
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

console.log('📥 Downloading Ready Player Me avatar...')
console.log('   URL:', avatarUrl)
console.log('   Saving to:', outputPath)

const file = fs.createWriteStream(outputPath)

https.get(avatarUrl, (response) => {
  if (response.statusCode === 200) {
    response.pipe(file)
    file.on('finish', () => {
      file.close()
      const stats = fs.statSync(outputPath)
      console.log('✅ Avatar downloaded successfully!')
      console.log('   File size:', (stats.size / 1024 / 1024).toFixed(2), 'MB')
      console.log('   Location:', outputPath)
      console.log('\n💡 Update OracleCanvas to use: /models/oracle-rpm.glb')
    })
  } else if (response.statusCode === 301 || response.statusCode === 302) {
    // Handle redirects
    console.log('🔄 Following redirect to:', response.headers.location)
    https.get(response.headers.location, (redirectResponse) => {
      redirectResponse.pipe(file)
      file.on('finish', () => {
        file.close()
        const stats = fs.statSync(outputPath)
        console.log('✅ Avatar downloaded successfully!')
        console.log('   File size:', (stats.size / 1024 / 1024).toFixed(2), 'MB')
      })
    })
  } else {
    console.error('❌ Failed to download avatar. Status:', response.statusCode)
    console.error('   Response:', response.statusMessage)
    fs.unlinkSync(outputPath)
  }
}).on('error', (err) => {
  console.error('❌ Error downloading avatar:', err.message)
  fs.unlinkSync(outputPath)
})

