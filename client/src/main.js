import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueFilterDateFormat from 'vue-filter-date-format';
import CoreuiVue from '@coreui/vue';

import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';


Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme);
Vue.use(CoreuiVue);
Vue.config.productionTip = false

Vue.use(VueFilterDateFormat);
Vue.use(require('vue-moment'));


new Vue({
  router,
  vuetify,
  VueFusionCharts,
  FusionCharts,
  render: h => h(App)
}).$mount('#app')
