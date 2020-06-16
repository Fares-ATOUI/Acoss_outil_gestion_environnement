import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Timeline from '../components/timeline/Timeline.vue'
import Timeline2 from '../components/timeline/Timeline2.vue'
import Historique from '../components/historique/HistoriqueTable.vue'
import Form from '../components/FormVue.vue'
import Admin from '../components/admin/TB.vue'
import test from '../components/timeline/Timeline3.vue'
import tableau from '../components/tableau/tableau.vue'

Vue.use(VueRouter)

const routes = [

  { path: '/', component: Home },
  { path: '/Timeline', component: Timeline },
  { path: '/Timeline2', component: Timeline2 },
  { path: '/Form', component: Form, name:'form'} ,
  { path: '/Historique', component: Historique, name:"historique"},
  { path: '/admin', component: Admin},
  { path: '/timeline3', component: test },
  { path: '/tableau', component: tableau }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
