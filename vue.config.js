const { defineConfig } = require('@vue/cli-service')
module.exports = {
  pwa: {
      workboxOptions: {
        exclude: [/_redirects/]
      }
    }
}
