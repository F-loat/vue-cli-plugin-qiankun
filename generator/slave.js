const mainTemplate = require('./template/slave-main')

module.exports = (api) => {
  const { port } = api.options
  const { projectName } = api.rootOptions

  if (port !== 8080) {
    api.extendPackage({
      scripts: {
        serve: `vue-cli-service serve --port ${port}`
      }
    })
  }

  api.injectImports(api.entryFile, `import './public-path'`)

  api.render('./template/slave')

  api.postProcessFiles((files) => {
    const routerConfigPath = 'src/router/index.js'

    if (files[routerConfigPath]) {
      files[routerConfigPath] = files[routerConfigPath].replace(
        /base: process.env.BASE_URL,/,
        `base: window.__POWERED_BY_QIANKUN__ ? '/${projectName}' : '/',`
      )
    }

    if (!files[api.entryFile].match(/\nnew Vue\(/)) {
      console.info('\n暂无法自动转换该项目的 main.js 文件，请手动修改\n')
    } else {
      files[api.entryFile] = files[api.entryFile].replace(
        /(new Vue\([\s\S]*)/,
        mainTemplate
      )
    }
  })
}
