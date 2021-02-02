const axios = require('axios')
const config = require('../config')()

module.exports = bot => msg => {

  const msgs = (msg.text).toLowerCase()
  const msgType = (msgs.includes('concol')) ? 'concol' : ((msgs.includes('conmex')) ? 'conmex' : '')
  const chatId = msg.chat.id
  const msgArr = (msg.text).split('')
  const mexican = 0.0057
  const colombian = 174.56

  /* const conv = async (from) => {
    const res = await axios.get(`https://api.currencylayer.com/live?access_key=${config.apiCurrency}`)
    console.log(res)
  } */

  const converter = (arr, con, coin) => {
    let numbers = []
    arr.map(x => {
      if (!isNaN(parseInt(x)) || x === '.') numbers = numbers.concat(x)
    }) 
    numbers = numbers.join('')
    // console.log(conv('MXN'))
    if (coin === 'Col') return `$ ${numbers} colombianos a mexicanos son $ ${(numbers * con).toFixed(2)}`
    return `$ ${numbers} mexicanos a colombianos son $ ${(numbers * con).toFixed(2)}`
  }

  try {
    if (msgType === 'concol' || msgType === 'conmex') {
      const conCo = (msgType === 'concol') ? converter(msgArr, mexican, 'Col') : converter(msgArr, colombian, 'Mex')
      const message = `@${msg.from.username} => ${conCo}`
      bot.sendMessage(chatId, message)
    }
      } catch (e) {
    console.log(e)
  }
}

