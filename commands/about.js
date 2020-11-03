const packageJson = require('../package.json')

const name = packageJson.name
const description = packageJson.description
const version = packageJson.version

module.exports = () => ctx => {
  const text =
    `*${name}* _v${version}_\n\n` +
    `_${description}_\n` +
    'Use /help to see the available commands\n\n' +
    '👻 Bot by @andresbonett'
  ctx.replyWithMarkdown(text)
}
