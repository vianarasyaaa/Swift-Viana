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

export async function isAnticallActive() {
  const db = getDb()
  const row = db.prepare('SELECT enabled FROM anticall_status WHERE id = 1').get()
  return !!row?.enabled
}

export async function setAnticallStatus(enabled) {
  const db = getDb()
  db.prepare(
    'INSERT INTO anticall_status (id, enabled) VALUES (1, ?) ON CONFLICT(id) DO UPDATE SET enabled = excluded.enabled'
  ).run(enabled ? 1 : 0)
  return enabled
}

export default { isAnticallActive, setAnticallStatus }
