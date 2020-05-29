<template>
  <div id="container">
    <header>
      <nav>
        <ol>
          <li v-for="app of apps" :key="app.name">
            <a @click="goto(app.name, app.href)">{{app.name}}</a>
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

const appInfos = process.env.NODE_ENV === 'production'
  ? [
    { name: 'foo-app', entry: '/vue-cli-plugin-qiankun/foo-app/source.html', href: '/vue-cli-plugin-qiankun/foo-app' },
    { name: 'bar-app', entry: '/vue-cli-plugin-qiankun/bar-app/source.html', href: '/vue-cli-plugin-qiankun/bar-app' }
  ]
  : [
    { name: 'foo-app', entry: '//localhost:8081', href: '/foo-app' },
    { name: 'bar-app', entry: '//localhost:8082', href: '/bar-app' }
  ]

export default {
  name: 'master',
  data () {
    return {
      loading: false,
      content: null,
      apps: appInfos.map(app => {
        return {
          ...app,
          render: this.render,
          activeRule: genActiveRule(app.href)
        }
      })
    }
  },
  created () {
    if (!window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__) {
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

      const defaultApp = apps[0] || {}
      setDefaultMountApp(defaultApp.href)

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
