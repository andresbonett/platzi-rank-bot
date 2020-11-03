require('dotenv').config({ path: __dirname + '/.env' })

const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

// Middleware
bot.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log('Response time: %sms', ms)
})

// Request
bot.start(ctx => ctx.reply('Welcome'))
bot.help(ctx => ctx.reply('Send me a sticker'))
bot.hears('hi', ctx => ctx.reply('Hey there'))

// command
bot.command('oldschool', ctx => ctx.reply('Hello'))
bot.command('modern', ({ reply }) => reply('Yo'))
bot.command('hipster', Telegraf.reply('λ'))

// Events
bot.on('sticker', ctx => ctx.reply('👍'))
bot.on('text', ctx => ctx.reply('Hello World'))

// start bot
bot.launch()
