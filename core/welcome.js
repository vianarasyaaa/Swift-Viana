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

import { getDb } from './sqlite.js'

export function isWelcomeEnabled(groupId) {
  if (!groupId) return false
  const row = getDb().prepare('SELECT enabled FROM group_welcome WHERE chatId = ?').get(groupId)
  return Boolean(row?.enabled)
}

export function setWelcomeEnabled(groupId, enabled) {
  if (!groupId) throw new Error('Group ID tidak valid')
  getDb()
    .prepare(`
      INSERT INTO group_welcome (chatId, enabled)
      VALUES (?, ?)
      ON CONFLICT(chatId) DO UPDATE SET enabled = excluded.enabled
    `)
    .run(groupId, enabled ? 1 : 0)

  return Boolean(enabled)
}

export function getWelcomeStatus(groupId) {
  return isWelcomeEnabled(groupId)
}

export default { isWelcomeEnabled, setWelcomeEnabled, getWelcomeStatus }
