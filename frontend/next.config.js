const withSass = require('@zeit/next-sass')
module.exports = withSass({ 
  serverRuntimeConfig: {
    onServer: true
  }
})
