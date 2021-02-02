const fetchUserDataPlatzi = require('./fetchUserDataPlatzi')

module.exports = bot => async msg => {
  const chatId = msg.chat.id
  let userPlatzi = msg.text[6] === '@' ? msg.text.slice(7) : msg.text.slice(6)
  if (!userPlatzi) bot.sendMessage(chatId, 'give me a user: /rank platzi_user')

  const { status, error, data } = await fetchUserDataPlatzi(userPlatzi)
  if (error === 200) {
    //console.log(data)
    const user = data.username
    const rank = data.platzi_rank
    const text = `🏁platzi rank: <b>@${user}</b> = <i>${rank}</i>`
    const totalCarees = data.careers.length
    const totalCont = data.contributions.length
    const totalCurses = data.courses.length
    const coursesInac = data.inactive_courses.length
    console.log(totalCurses, totalCont, totalCarees, coursesInac)
    console.log(text)
    bot.sendMessage(chatId, text, { parse_mode: 'HTML' })
    bot.sendMessage(chatId, `@${user} ha respondido ${data.answers} veces en Platzi`)
    bot.sendMessage(chatId, `@${user} ha hecho ${totalCurses} cursos en total`)
    bot.sendMessage(chatId, `@${user} ha hecho ${totalCont} aportaciones en total`)
    bot.sendMessage(chatId, `@${user} ha terminado ${totalCarees} carreras en total`)
  } else {
    if (status == 'PrivateProfile') {
      bot.sendMessage(chatId, 'user is private!')
    } else {
      console.log('command:', msg.text)
      bot.sendMessage(chatId, 'sorry, the user does not exist in platzi')
    }
  }
}
