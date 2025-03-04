const { sticker, sticker5 } = require('../lib/sticker')

let handler = async (m, { conn, usedPrefix, command }) => {
  let stiker = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/webp/.test(mime)) {
      let img = await q.download()
      stiker = await sticker5(img, false, packname, author)
    } else if (/image/.test(mime)) {
      let img = await q.download()
      stiker = await sticker5(img, false, packname, author)
    } else if (/video/.test(mime)) {
      if ((q.msg || q).seconds > 11) return m.reply('max 10 seconds!')
      let img = await q.download()
      stiker = await sticker(img, false, packname, author)
    } else if (m.quoted.text) {
      if (isUrl(m.quoted.text)) stiker = await sticker(false, m.quoted.text, packname, author)
      else throw 'Invalid URL! end with jpg/gif/png'
    }
  } catch (e) {
    throw e
  }
  finally {
    if (stiker) await conn.sendFile(m.chat, stiker, '', '', m, 0, { asSticker: true })
    else {
      return conn.sendButton(m.chat, `Reply to media with commands *${usedPrefix + command}*`, '© Alice 🥀', 'Enable Automatic Stickers', '.1 s', m)
    }
  }
}
handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = /^(s(t|k|tic?ker)?)$/i

module.exports = handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/, 'gi'))
}
