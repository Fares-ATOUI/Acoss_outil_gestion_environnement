import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Timeline from '../components/timeline/Timeline.vue'
import Timeline2 from '../components/timeline/Timeline2.vue'
import Historique from '../components/historique/HistoriqueTable.vue'
import Form from '../components/FormVue.vue'
import Admin from '../components/admin/requete.vue'
import test from '../components/timeline/Timeline3.vue'
import tableau from '../components/tableau/tableau.vue'
import prevision from '../components/tableau/prevision.vue'
import ProjetMep from '../components/admin/Table.vue'
import ProjetCouloir from '../components/admin/TableVue.vue'
import ProjetVersion from '../components/admin/TableVersion.vue'
Vue.use(VueRouter)

const routes = [

  { path: '/', component: Home },
  { path: '/Timeline', component: Timeline },
  { path: '/Timeline2', component: Timeline2 },
  { path: '/Form', component: Form, name:'form'} ,
  { path: '/Historique', component: Historique, name:"historique"},
  { path: '/admin', component: Admin},
  { path: '/timeline3', component: test },
  { path: '/tableau', component: tableau },
  { path: '/projet/mep', component: ProjetMep },
  { path: '/projet/couloir', component: ProjetCouloir },
  { path: '/projet/version', component: ProjetVersion },
  { path: '/prevision', component: prevision }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
