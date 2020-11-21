const token = process.env.TOKEN

const Bot = require('node-telegram-bot-api')
let bot

if (process.env.NODE_ENV === 'production') {
  bot = new Bot(token)
  bot.setWebHook(process.env.HEROKU_URL + bot.token)
} else {
  bot = new Bot(token, { polling: true })
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode')

//COMMANDS
const hello = require('./commands/hello')
const ping = require('./commands/ping')
const rank = require('./commands/rank')

bot.onText(/^\/hello/, hello(bot))
bot.onText(/^\/ping/, ping(bot))
bot.onText(/^\/rank/, rank(bot))

module.exports = bot
