'use strict'
require('dotenv').config()

module.exports = function config () {
  const config = {
    dev: process.env.NODE_ENV || 'dev',
    token: process.env.TOKEN,
    apiCurrency: process.env.API_CURRENCY
  }

  return config
  
}

