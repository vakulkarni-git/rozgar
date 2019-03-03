// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuefire from 'vuefire'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import { database } from '@/services/firebase'
import VueAnalytics from 'vue-analytics'
import VueSignaturePad from 'vue-signature-pad'

Vue.use(Vuefire)
Vue.use(VueResource)
Vue.use(VueSignaturePad)
Vue.use(VueAnalytics, {
  id: 'UA-101944993-1',
  router
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  firebase: {
    worker: database.ref('SME').orderByChild('created_at').limitToLast(10),
    workAppointment: database.ref('WorkAppointment').orderByChild('created_at'),
    timeline: database.ref('Timeline').orderByChild('created_at'),
    workerAdvertisement: database.ref('labourer_self').orderByChild('id')
  },
  router,
  template: '<App/>',
  components: { App }
})
