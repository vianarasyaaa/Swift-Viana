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
import { settings } from '../../config/settings.js'
import { buildMenuFooter, buildCategoryList, getGreeting } from '../../lib/menu.js'
import { ButtonV2 } from '../../lib/tombol.js'
import { isOwner, resolvePhoneNumber } from '../../lib/cek-akses.js'
import { getUser } from '../../core/database-user.js'
import { creatorWatermark } from '../../core/identitas.js'

const handler = async (m, { conn, usedPrefix }) => {
  const isOwnerUser = await isOwner(m.sender, conn)
  const user = await getUser(m.sender)
  const contactNumber = await resolvePhoneNumber(m.sender, conn)


  const footerLong = buildMenuFooter({
    prefix: usedPrefix,
    pushName: m.pushName,
    contactNumber,
    isOwnerUser,
    registeredAt: user?.registeredAt,
  }) + '\n\n' + creatorWatermark()


  const rawSections = buildCategoryList({ prefix: usedPrefix }).sections
  const sections = rawSections.map((section) => ({
    title: section.title,
    highlight_label: section.highlightLabel || '',
    rows: section.rows.map((row) => ({
      header: row.header || '',
      title: row.title,
      description: row.description || '',
      id: row.command,
    })),
  }))


  const button = new ButtonV2(conn)
    .setBody(' ') .setFooter(footerLong)

  const thumbnailPath = './assets/image/swiftviana.jpg'
  if (fs.existsSync(thumbnailPath)) {
    button.setThumbnail(fs.readFileSync(thumbnailPath))
  } else {
    console.log(`  \x1b[31m✗\x1b[0m  Thumbnail tidak ditemukan: ${thumbnailPath}`)
  }

  button.addButton('♕ OWNER BOT', `${usedPrefix}owner`)

  button.addRawButton({
    buttonText: { displayText: '☰ LIST MENU' },
    buttonId: 'menu',
    type: 1,
    nativeFlowInfo: {
      name: 'single_select',
      paramsJson: JSON.stringify({
        title: `${settings.botName} Menu`,
        sections: sections,
      }),
    },
  })

  await button.send(m.chat, { quoted: m.raw })
}

handler.command = /^menu$/i
handler.help = ['menu']
handler.tags = ['main']
handler.description = 'Menampilkan menu utama bot'

export default handler