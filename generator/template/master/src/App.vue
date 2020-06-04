<template>
  <div id="container">
    <header>
      <nav>
        <ol>
          <li v-for="app of apps" :key="app.name">
            <a @click="goto(app.name, `${app.activeRule}`)">{{app.name}}</a>
          </li>
        </ol>
      </nav>
    </header>
    <div id="appContainer" />
  </div>
</template>

<script>
  import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun'

	export default {
    name: 'master',
		data () {
      return {
        apps: [
          { name: 'slave', entry: '//localhost:8081', container: '#appContainer', activeRule: '/slave' }
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
      initQiankun () {
        registerMicroApps(
          this.apps,
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
