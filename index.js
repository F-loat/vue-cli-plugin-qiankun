const path = require('path')

module.exports = (api) => {
  const { name, qiankunConfig = {} } = api.service.pkg

  api.chainWebpack((config) => {
    if (qiankunConfig.type === 'slave') {
      config.merge({
        entry: {
          main: [
            path.resolve(__dirname, './public-path.js'),
            path.resolve(api.service.context, 'src/main.js')
          ]
        }
      })
    }

    config.devServer
      .headers({
        'Access-Control-Allow-Origin': '*'
      })

    config.output
      .library(`${name}-[name]`)
      .libraryTarget('umd')
      .jsonpFunction(`webpackJsonp_${name}`)
  })
}
