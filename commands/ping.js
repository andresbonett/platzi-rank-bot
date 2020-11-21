module.exports = bot => msg => {
  var chatId = msg.chat.id
  var tipoChat = msg.chat.type

  if (tipoChat == 'private') {
    bot.sendMessage(chatId, 'Pong!')
  } else if (tipoChat == 'supergroup') {
    bot.sendMessage(chatId, 'Este comando solo funciona en privado')
  }
}
