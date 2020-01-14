<template>
  <div id="container">
    <header>
      <nav>
        <ol>
          <li v-for="app of apps" :key="app.name">
            <a @click="goto(app.name, `/${app.name}`)">{{app.name}}</a>
          </li>
        </ol>
      </nav>
    </header>
    <div v-if="loading">loading</div>
    <div class="appContainer" v-html="content" />
  </div>
</template>

<script>
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun'

const genActiveRule = routerPrefix => {
  return location => location.pathname.startsWith(routerPrefix)
}

const entries = {
  'foo-app': process.env.NODE_ENV === 'production' ? '/foo-app' : '//localhost:8081',
  'bar-app': process.env.NODE_ENV === 'production' ? '/bar-app' : '//localhost:8082'
}

export default {
  name: 'master',
  data () {
    return {
      loading: false,
      content: null,
      apps: [
        { name: 'foo-app', entry: entries['foo-app'], render: this.render, activeRule: genActiveRule('/foo-app') },
        { name: 'bar-app', entry: entries['bar-app'], render: this.render, activeRule: genActiveRule('/bar-app') }
      ]
    }
  },
  created () {
    if (!window.__POWERED_BY_QIANKUN__) {
      this.initQiankun()
    } else {
      location.reload()
    }
  },
  methods: {
    goto (title, href) {
      window.history.pushState({}, title, href)
    },
    render ({ appContent, loading }) {
      this.content = appContent
      this.loading = loading
    },
    initQiankun () {
      const { apps } = this

      registerMicroApps(
        apps,
        {
          beforeLoad: [
            app => {
              // eslint-disable-next-line no-console
              console.log('before load', app)
            }
          ],
          beforeMount: [
            app => {
              // eslint-disable-next-line no-console
              console.log('before mount', app)
            }
          ],
          afterUnmount: [
            app => {
              // eslint-disable-next-line no-console
              console.log('after unload', app)
            }
          ]
        }
      )

      setDefaultMountApp('/foo-app')

      runAfterFirstMounted(() => {
        // eslint-disable-next-line no-console
        console.info('first app mounted')
      })

      start({ prefetch: true })
    }
  }
}
</script>

<style scoped>
a {
  color: #42b983;
  cursor: pointer;
}
.appContainer {
  margin-top: 50px;
}
</style>
