let fetch = require('node-fetch')
let googleIt = require('nhentai-it')
let handler = async (m, { conn, command, args, usedPrefix }) => {
  let full = /f$/i.test(command)
  let text = args.join` `
  if (!text) throw `Kodenya mana?\n\nContoh penggunaan:\n${usedPrefix + command} 344253`
  let url = 'https://nhentai.net/g/?q=' + encodeURIComponent(text)
  let search = await googleIt({ query: code })
  let msg = search.map(({ title, link, snippet }) => {
    return `*${title}*\n_${link}_\n_${snippet}_`
  }).join`\n\n`
  try {
    let ss = await (await fetch(global.API('https://api.lolhuman.xyz/api/nhentai/344253?apikey=711994c4ea9aa5a0ec39f7f2', { delay: 1000, url, full }))).buffer()
    if (ss.includes('html')) throw ''
    await conn.sendFile(m.chat, ss, 'screenshot.png', url + '\n\n' + msg, m, 0, { thumbnail: await (await fetch(ss)).buffer() })
  } catch (e) {
    m.reply(msg)
  }
}
handler.help = ['nhentai', 'nhs'].map(v => v + ' <search>')
handler.tags = ['NSFW']
handler.command = /^nhentai?$/i
handler.owner = false
handler.mods = false
handler.premium = true
handler.group = false
handler.private = true

handler.admin = false
handler.botAdmin = false

handler.fail = null

handler.limit = true

module.exports = handler
