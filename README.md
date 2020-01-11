## vue-cli-plugin-qiankun

> qiankun plugin for vue-cli

[![npm version](https://img.shields.io/npm/v/vue-cli-plugin-qiankun.svg?style=flat-square)](https://www.npmjs.com/package/vue-cli-plugin-qiankun) [![npm downloads](https://img.shields.io/npm/dt/vue-cli-plugin-qiankun.svg?style=flat-square)](https://www.npmjs.com/package/vue-cli-plugin-qiankun)

### 使用步骤 (Use Setup)

1. 创建主应用 (Create Master Project)

``` sh
$ vue create master
$ cd master
$ vue add vue-cli-plugin-qiankun --type master
```

2. 创建子应用 (Create Slave Project)

``` sh
$ vue create foo-app
$ cd foo-app
$ vue add vue-cli-plugin-qiankun --type slave --port 8081
```

- 重复此步骤，创建 `bar-app` 项目 (Repeat this step to create a `bar-app` project)

3. 配置主应用 (Config Master Project)

> master/src/App.vue

``` vue
<script>
export default {
  name: 'master',
  data () {
    return {
      loading: false,
      content: null,
      apps: [
        { name: 'foo-app', entry: '//localhost:8081', render: this.render, activeRule: genActiveRule('/foo-app') },
        { name: 'bar-app', entry: '//localhost:8082', render: this.render, activeRule: genActiveRule('/bar-app') }
      ]
    }
  },
  // ...
  methods: {
    // ...
    initQiankun () {
      // ...
      setDefaultMountApp('/foo-app')
      // ...
    }
  }
}
</script>
```

4. 运行各项目 (Run each project)

``` sh
$ yarn serve
```

- 各项目成功运行后，访问 [主应用](http://http://localhost:8080) 查看效果 (After each project runs successfully, visit the [master project](http://http://localhost:8080) to see the effect)

### 致谢 (Acknowledgements)

- [vue-cli](https://github.com/vuejs/vue-cli) Standard Tooling for Vue.js Development.

- [qiankun](https://github.com/umijs/qiankun) Blazing fast, simple and completed solution for micro frontends.

- [single-spa](https://github.com/CanopyTax/single-spa) What an awesome meta-framework for micro-frontends!
