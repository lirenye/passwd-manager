import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Vant UI
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// axios
import instance from '@/utils/axios';
Vue.prototype.$axios = instance;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
