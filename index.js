require('dotenv').config({ path: __dirname + '/.env' })

const { Telegraf } = require('telegraf')
const help = require('./commands/help')
const rank = require('./commands/rank')
const about = require('./commands/about')
const start = require('./commands/start')

const bot = new Telegraf(process.env.BOT_TOKEN)

// Request
bot.start(start())
bot.help(help())
// command
bot.command('about', about())
bot.command('rank', rank())

bot.launch()
