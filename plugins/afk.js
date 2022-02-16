let handler = async (m, { conn, text }) => {
  let user = global.db.data.users[m.sender]
  user.afk = + new Date
  user.afkReason = text
  m.reply(`
${user ? user.name : conn.getName(m.sender)} now AFK${text ? ': ' + text : ''}
`)
}
handler.help = ['afk [reason]']
handler.tags = ['main']
handler.command = /^afk$/i

module.exports = handler
