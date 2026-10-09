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

import { settings } from '../../config/settings.js'
import { formatRpgText } from './format.js'
import { resolveTarget, getMentionedJids, getQuotedSender } from './target.js'

function buildRpgContext(m, { conn, usedPrefix }) {
  const enriched = m

  enriched.prefix = usedPrefix || settings.defaultPrefix
  enriched.mentionedJid = getMentionedJids(m)
  enriched.quoted = enriched.quoted
    ? { sender: getQuotedSender(m), message: enriched.quoted }
    : getQuotedSender(m)
      ? { sender: getQuotedSender(m), message: null }
      : null
  enriched.targetJid = resolveTarget(m)

  enriched.reply = async (text, extra = {}) => {
    const formatted = extra.rpgFormat === false ? text : formatRpgText(text)
    const payload = { text: formatted, ...extra }
    delete payload.rpgFormat
    return conn.sendMessage(m.chat, payload, { quoted: m.raw })
  }

  enriched.react = async (emoji) => {
    try {
      await conn.sendMessage(m.chat, { react: { text: emoji, key: m.raw.key } })
    } catch {

    }
  }

  return { m: enriched, sock: conn }
}

export { buildRpgContext }

export default { buildRpgContext }
