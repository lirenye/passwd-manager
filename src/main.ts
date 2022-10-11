import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Vant UI
import Vant from 'vant';
Vue.use(Vant);

// nutui UI
import NutUI from '@nutui/nutui';

NutUI.install(Vue);

// axios
import instance from '@/utils/axios';
Vue.prototype.$axios = instance;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
