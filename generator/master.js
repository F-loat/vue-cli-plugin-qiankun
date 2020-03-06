module.exports = (api) => {
  api.extendPackage({
    dependencies: {
      'qiankun': '^1.3.13'
    },
    qiankunConfig: {
      type: 'master'
    }
  })

  api.render('./template/master')
}
