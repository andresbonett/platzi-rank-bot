module.exports = () => ctx => {
  const text = `
  Welcome to Platzi Rank

  You can see your platzi ranking without leaving telegram

  Start by sending me these commands:

    /rank username: get platzi rank
    /help to see the available commands
    /about to see the bot info.
    
    Bot🤖 by @andresbonett👨🏻‍💻'
    
    `
  ctx.replyWithMarkdown(text)
}
