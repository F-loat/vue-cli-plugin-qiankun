module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-cli-plugin-qiankun/'
    : '/'
}
