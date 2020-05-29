const path = require('path')

module.exports = (api) => {
  const { name, dependencies = {} } = api.service.pkg
  const isMaster = !!dependencies.qiankun

  if (isMaster) return

  api.chainWebpack((config) => {
    config.devServer
      .headers({
        'Access-Control-Allow-Origin': '*'
      })

    config.merge({
      entry: {
        main: [
          path.resolve(__dirname, './public-path.js'),
          path.resolve(api.service.context, 'src/main.js')
        ]
      }
    })

    config.output
      .library(`${name}-[name]`)
      .libraryTarget('umd')
      .jsonpFunction(`webpackJsonp_${name}`)
  })
}
