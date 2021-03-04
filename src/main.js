import Vue from 'vue'
import App from './App.vue'
import store from './store'

// eslint-disable-next-line
const heroku_api_key = '1xYU87pyIfSPT9t9Pwrlv2QooZowK3iQ'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
