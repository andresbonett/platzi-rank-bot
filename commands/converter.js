module.exports = bot => msg => {

  const chatId = msg.chat.id
  const msgType = msg.text.slice(1,7)
  const msgArr = (msg.text).split('')
  const mexican = 0.0057
  const colombian = 174.56

  const converter = (arr, con, coin) => {
    let numbers = []
    arr.map(x => {
      if (!isNaN(parseInt(x)) || x === '.') numbers = numbers.concat(x)
    }) 
    numbers = numbers.join('')
    if (coin === 'Col') return `$ ${numbers} colombianos a mexicanos son $ ${(numbers * con).toFixed(2)}`
    return `$ ${numbers} mexicanos a colombianos son $ ${(numbers * con).toFixed(2)}`
  }

  try {
    const conCo = (msgType === 'conCol') ? converter(msgArr, mexican, 'Col') : converter(msgArr, colombian, 'Mex')
    const message = `@${msg.from.username} => ${conCo}`
    bot.sendMessage(chatId, message)
  } catch (e) {
    console.log(e)
  }
}

