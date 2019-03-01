import Vue from 'vue'
import Router from 'vue-router'
import SME from '@/components/SME'
import Workers from '@/components/Workers'
import AboutUs from '@/components/AboutUs'
import Login from '@/components/Login'
import Payment from '@/components/Payment'
import Registration from '@/components/Registration'
import WorkAppointments from '@/components/WorkAppointments'
import DrawingSheet from '@/components/DrawingSheet'
import Confirmation from '@/components/Confirmation'
import Timeline from '@/components/Timeline'
import WorkersNew from '@/components/WorkersNew'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'sme',
      component: SME
    },
    {
      path: '/workers/:id',
      name: 'workers',
      component: Workers
    },
    {
      path: '/workers_new/:id',
      name: 'workers_new',
      component: WorkersNew
    },
    {
      path: '/confirmation/:id',
      name: 'confirmation',
      component: Confirmation
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment
    },
    {
      path: '/workAppointments',
      name: 'workAppointments',
      component: WorkAppointments
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: Timeline
    },
    {
      path: '/DrawingSheet',
      name: 'DrawingSheet',
      component: DrawingSheet
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: AboutUs
    }
  ]
})
