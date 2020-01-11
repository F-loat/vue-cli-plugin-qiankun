module.exports = (api) => {
  const { name } = api.service.pkg

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
