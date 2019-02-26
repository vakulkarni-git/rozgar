import Vue from 'vue'
import Router from 'vue-router'
import SME from '@/components/SME'
import Workers from '@/components/Workers'
import AboutUs from '@/components/AboutUs'
import Login from '@/components/Login'
import Payment from '@/components/Payment'
import Registration from '@/components/Registration'
import WorkAppointments from '@/components/WorkAppointments'

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
      path: '/aboutus',
      name: 'aboutus',
      component: AboutUs
    }
  ]
})
