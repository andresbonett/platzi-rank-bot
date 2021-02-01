const converter = require('./commands/converter')

const botFunctions = (bot) => {

  
  bot.start((ctx) => {
    ctx.reply(`Hello @${ctx.message.from.username}`)
  })

  //bot.telegram.getMe().then(botInfo => console.log(botInfo))
  bot.command(['botCarGDev'], (ctx) => {
    ctx.reply('Twitter: https://twitter.com/CarGDev')
  })

  bot.command(['date', 'hour'], ctx => ctx.reply((new Date()).toString()))

  let modeBadWords = false

  bot.on('text', ctx => {
    const msg = ctx.message.text
    
    const badWordArr = ['holy shit', 'gonorrea', 'puto', 'mamón', 'mamon', 'marico', 'pendejo', 'pinche', 'culero', 'arriba el américa', 'odiame mas']
    const inc = msg.includes('@CarGDev')
    const includeBot = msg.includes('@cargdevBot')
      
    const msgArr = msg.split('')
    const activateBadWords = msg.includes('Activar groserias mode')
    const deActivateBadWords = msg.includes('Desactivar groserias mode')
    if (activateBadWords) modeBadWords = true
    if (deActivateBadWords) modeBadWords = false

    badWordArr.map(x => {
      if ((msg.toLowerCase().includes(x)) && modeBadWords) ctx.reply(`@${ctx.message.from.username} dijiste una mala palabra`)
    })
    
    if (inc) ctx.reply(`En un momento mas te contesto, por el momento debo estar ocupado gracias @${ctx.message.from.username}`)
    if (includeBot) ctx.reply(`Yo solo soy un bot mas @${ctx.message.from.username}`)
    
  })

  bot.on('sticker', ctx => {
    //console.log(ctx.message.from.username)
    ctx.reply(`Que chido sticker @${ctx.message.from.username}`)
  })

  bot.launch()


  return {
    mexChange: converter.converterMexican(bot), 
    colChange: converter.converterColombian(bot)
  }
}



module.exports = botFunctions
