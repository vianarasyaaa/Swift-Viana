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


import { settings } from '../config/settings.js'

export const CREATOR_NAME = settings.ownerName || '@rasyaardi'
export const STUDIO_NAME = '©Viana Studio'
export const PROJECT_NAME = 'SwiftViana'
export const PROJECT_YEAR = settings.footerYear || '2026'

export function creatorWatermark() {
  return `${STUDIO_NAME} | ${CREATOR_NAME}`
}

export default {
  CREATOR_NAME,
  STUDIO_NAME,
  PROJECT_NAME,
  PROJECT_YEAR,
  creatorWatermark,
}
