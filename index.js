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

  api.configureWebpack(() => {
    return {
      devServer: {
        // 允许跨域
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      },
      output: {
        // 把应用打包成 umd 库格式
        library: `${name}-[name]`,
        libraryTarget: 'umd',
        jsonpFunction: `webpackJsonp_${name}`
      }
    }
  })
}
