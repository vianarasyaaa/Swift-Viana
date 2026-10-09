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

import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { settings } from '../../config/settings.js'
import { ButtonV2 } from '../../lib/tombol.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const QRIS_FILENAME = String(settings.donation?.qrisImage || '').trim()
const QRIS_PATH = QRIS_FILENAME ? path.join(__dirname, '..', '..', 'assets', 'image', QRIS_FILENAME) : null

const donationMenuText = [
  '╭───〔 💝 DONASI SWIFTVIANA 〕',
  '│',
  '│ Terima kasih sudah mendukung',
  '│ perkembangan dan pemeliharaan',
  '│ SwiftViana.',
  '│',
  '│ Dukungan Anda membantu biaya',
  '│ server, pengembangan fitur,',
  '│ serta menjaga bot tetap aktif.',
  '│',
  '╰──────────────',
  '',
  'Silakan pilih metode pembayaran di bawah ini.',
].join('\n')

const formatDanaNumber = (number) => {
  if (!number) return 'Belum dikonfigurasi'
  return String(number).replace(/\s+/g, '')
}

const handler = async (m, { conn, usedPrefix }) => {
  const action = String(m.args?.[0] || '').toLowerCase()

  if (action === 'dana') {
    const number = formatDanaNumber(settings.donation?.danaNumber)
    const name = settings.donation?.danaName || settings.ownerName

    const text = [
      '╭───〔 💳 DANA 〕',
      '│',
      `│ Nama   : ${name}`,
      `│ Nomor  : ${number}`,
      '│',
      '│ Silakan kirim donasi sesuai',
      '│ kemampuan Anda. Terima kasih',
      '│ atas dukungannya! 🙏',
      '╰──────────────',
    ].join('\n')

    await conn.sendMessage(m.chat, { text }, { quoted: m.raw })
    return
  }

  if (action === 'qris') {
    if (!QRIS_PATH || !(await fs.pathExists(QRIS_PATH))) {
      await conn.sendMessage(
        m.chat,
        { text: 'QRIS belum dikonfigurasi. Masukkan file QRIS milik Anda sendiri ke assets/image/ lalu isi settings.donation.qrisImage.' },
        { quoted: m.raw }
      )
      return
    }

    const image = await fs.readFile(QRIS_PATH)
    const caption = [
      '╭───〔 📱 QRIS 〕',
      '│',
      '│ Scan QRIS di atas menggunakan',
      '│ aplikasi pembayaran yang',
      '│ mendukung QRIS.',
      '│',
      '│ Terima kasih atas dukungan',
      '│ Anda untuk SwiftViana. 🙏',
      '╰──────────────',
    ].join('\n')

    await conn.sendMessage(
      m.chat,
      { image, caption },
      { quoted: m.raw }
    )
    return
  }

  const button = new ButtonV2(conn)
    .setBody(' ')
    .setFooter(donationMenuText)

  const thumbnailPath = './assets/image/donasi.jpg'
  if (await fs.pathExists(thumbnailPath)) {
    button.setThumbnail(await fs.readFile(thumbnailPath))
  }

  button.addButton('𝚿 DANA', `${usedPrefix}donasi dana`)
  button.addButton('▣ QRIS', `${usedPrefix}donasi qris`)

  await button.send(m.chat, { quoted: m.raw })
}

handler.command = /^donasi$/i
handler.help = ['donasi']
handler.tags = ['main']
handler.description = 'Menampilkan pilihan metode donasi'
handler.category = 'main'
handler.hiddenFromCategory = false

export default handler
