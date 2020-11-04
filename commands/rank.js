const axios = require('axios')

async function fetchRank(userPlatzi) {
  const API_PLATZI = `https://platzi-user-api.jecsham.com/api/v1/getUserSummary/@${userPlatzi}`

  try {
    const response = await axios.get(API_PLATZI)
    return {
      user: response.data.userData.username,
      rank: response.data.userData.platzi_rank,
    }
  } catch (err) {
    console.log('ERROR:', err.message)
  }
}

module.exports = () => async ctx => {
  let userPlatzi =
    ctx.message.text[6] === '@'
      ? ctx.message.text.slice(7)
      : ctx.message.text.slice(6)

  if (!userPlatzi) return ctx.reply('dame un usuario: /rank user_platzi')

  const { user, rank } = await fetchRank(userPlatzi)

  if (user) {
    const text = `platzi rank: *@${user}* = _${rank}_`
    console.log(text)
    ctx.replyWithMarkdown(text)
  } else {
    console.log(ctx.message.text, 'err: username')
    ctx.reply('Usuario no existe o es privado')
  }
}
