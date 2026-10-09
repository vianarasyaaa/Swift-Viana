/**
 * ╔══════════════
 * ║  ------ SWIFTVIANA --------
 * ║ WA Bot • ©Viana Studio | @rasyaardi   
 * ╚══════════════
 * 
 * @maintainer ©Viana Studio | @rasyaardi
 * brand: ©Viana Studio
 * contact: @rasyaardi
 * project: SwiftViana
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TYPO_ASSET = path.join(__dirname, '..', 'assets', 'image', 'swiftviana-tools.jpg')

export function getTypoDocumentAsset() {
  return fs.existsSync(TYPO_ASSET) ? TYPO_ASSET : null
}

export default { getTypoDocumentAsset }
