module.exports = (api, { type }) => {
  require(`./${type}`)(api)

  if (api.hasPlugin('eslint')) {
    api.onCreateComplete(() => {
      require('@vue/cli-plugin-eslint/lint')({}, api)
    })
  }
}
