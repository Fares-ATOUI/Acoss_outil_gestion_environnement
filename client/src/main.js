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

import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
import Bootstrap from 'bootstrap-vue'
//import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Bootstrap)

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};

Vue.use(VueSweetalert2, options);

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


