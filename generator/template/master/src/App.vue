<template>
  <div id="container">
    <header>
      <nav>
        <ol>
          <li v-for="app of apps" :key="app.name"><a @click="goto(app.name, `/${app.name}`)">{{app.name}}</a></li>
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

	export default {
    name: 'master',
		data () {
      return {
        loading: false,
        content: null,
        apps: [
          { name: 'slave', entry: '//localhost:8081', render: this.render, activeRule: genActiveRule('/slave') }
        ]
      }
    },
    created () {
      if (!window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__) {
        this.initQiankun()
      } else {
        // fix hot-reload
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

        setDefaultMountApp('/slave')

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
