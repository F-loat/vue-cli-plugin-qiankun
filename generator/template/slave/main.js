exports.standard = `import Vue from 'vue'
  import App from './App.vue'

  Vue.config.productionTip = false

  new Vue({
    render: h => h(App)
  }).$mount('#app')
`

exports.replacement = `let instance = null

  function render () {
    instance = $1
  }

  if (!window.__POWERED_BY_QIANKUN__) {
    render()
  }

  export async function bootstrap () {
    // eslint-disable-next-line no-console
    console.log('vue app bootstraped')
  }

  export async function mount (props) {
    // eslint-disable-next-line no-console
    console.log('props from main framework', props)
    render()
  }

  export async function unmount () {
    instance.$destroy()
    instance = null
  }
`
