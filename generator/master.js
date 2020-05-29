module.exports = (api) => {
  api.extendPackage({
    dependencies: {
      "qiankun": "^2.0.0"
    }
  })

  api.render('./template/master')
}
