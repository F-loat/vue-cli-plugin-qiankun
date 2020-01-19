module.exports = (api, projectOptions) => {
  const { name, scripts } = api.service.pkg
  const { publicPath, devServer } = projectOptions

  // 自动注入 publicPath 配置
  if (
    process.env.NODE_ENV !== 'production' &&
    publicPath === '/'
  ) {
    // eslint-disable-next-line camelcase
    const { npm_lifecycle_event, PORT } = process.env

    const currentScript = scripts[npm_lifecycle_event]

    const { port } = require('minimist')(currentScript.split(' '))

    const realPort = port || PORT || devServer.port

    if (realPort) {
      projectOptions.publicPath = `//localhost:${realPort}/`
    }
  }

  api.chainWebpack((config) => {
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
