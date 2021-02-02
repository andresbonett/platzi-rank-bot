const config = require('./config')()
const Bot = require('node-telegram-bot-api')
const hello = require('./commands/hello')
const ping = require('./commands/ping')
const rank = require('./commands/rank')
const converter = require('./commands/converter')

let bot

if (config.dev === 'production') {
  bot = new Bot(config.token)
  bot.setWebHook(process.env.HEROKU_URL + bot.token)
} else {
  bot = new Bot(config.token, { polling: true })
}

console.log(`Bot server started in the ${config.dev} mode`)

bot.onText(/^\/hello/, hello(bot))
bot.onText(/^\/ping/, ping(bot))
bot.onText(/^\/rank/, rank(bot))
bot.onText(/\w/, converter(bot))

module.exports = bot
