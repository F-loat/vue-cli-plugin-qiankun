module.exports = {
  productionSourceMap: false,
  indexPath: process.env.NODE_ENV === 'production'
    ? 'source.html'
    : 'index.html',
  publicPath: process.env.VUE_APP_BASE_PATH
}
