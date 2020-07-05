import Vue from 'vue'
import App from './App.vue'

import './bootstrap'
import './httpClient'
import './forms'
import './filters'
import './mixins'
import './vueMaterials'
import{router} from './routers'
import store from './store'


Vue.config.productionTip = false

new Vue({ 
  store,
  router,
  render: h => h(App),
}).$mount('#app')
