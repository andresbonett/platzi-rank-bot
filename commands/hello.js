module.exports = bot => msg => {
  const name = msg.from.first_name
  bot.sendMessage(msg.chat.id, 'Hello, ' + name + '!').then(() => {
    // reply sent!
  })
}
