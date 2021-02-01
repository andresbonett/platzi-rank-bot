const fetchUserDataPlatzi = require('./fetchUserDataPlatzi')

module.exports = bot => async msg => {
  const chatId = msg.chat.id
  let userPlatzi = msg.text[6] === '@' ? msg.text.slice(7) : msg.text.slice(6)
  if (!userPlatzi) bot.sendMessage(chatId, 'give me a user: /rank platzi_user')

  const { status, error, data } = await fetchUserDataPlatzi(userPlatzi)
  if (error === 200) {
    const user = data.username
    const rank = data.platzi_rank
    const text = `🏁platzi rank: <b>@${user}</b> = <i>${rank}</i>`
    console.log(text)
    bot.sendMessage(chatId, text, { parse_mode: 'HTML' })
  } else {
    if (status == 'PrivateProfile') {
      bot.sendMessage(chatId, 'user is private!')
    } else {
      console.log('command:', msg.text)
      bot.sendMessage(chatId, 'sorry, the user does not exist in platzi')
    }
  }
}
