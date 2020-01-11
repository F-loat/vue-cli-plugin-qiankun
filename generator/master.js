module.exports = (api) => {
  api.extendPackage({
    dependencies: {
      'qiankun': '^1.3.13'
    }
  })

  api.render('./template/master')
}
