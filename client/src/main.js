import Vue from 'vue'
import App from './App.vue'
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';

import router from './router'
import store from './store';

Vue.config.productionTip = false;

// register VueFusionCharts component
Vue.use(VueFusionCharts, FusionCharts, Charts);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
