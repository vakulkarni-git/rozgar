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
import WorkerAdvertisements from '@/components/WorkerAdvertisements'
import BookWorker from '@/components/BookWorker'
import LabourerRegistration from '@/components/LabourerRegistration'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/sme',
      name: 'sme',
      component: SME,
      meta: {description: 'List of SMEs', requiresAuth: true}
    },
    {
      path: '/workers/:id',
      name: 'workers',
      component: Workers,
      meta: {description: 'List of Workers', requiresAuth: true}
    },
    {
      path: '/confirmation/:id',
      name: 'confirmation',
      component: Confirmation,
      meta: {description: 'Confirmation of work appointment', requiresAuth: true}
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment,
      meta: {description: 'Payment page', requiresAuth: true}
    },
    {
      path: '/workAppointments',
      name: 'workAppointments',
      component: WorkAppointments,
      meta: {description: 'Work Appointments page', requiresAuth: true}
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: Timeline,
      meta: {description: 'Timeline of the appointment', requiresAuth: true}
    },
    {
      path: '/DrawingSheet',
      name: 'DrawingSheet',
      component: DrawingSheet,
      meta: {description: 'Signature page', requiresAuth: true}
    },
    {
      path: '/workerAdvertisements',
      name: 'WorkerAdvertisements',
      component: WorkerAdvertisements,
      meta: {description: 'Self advertisements page', requiresAuth: true}
    },
    {
      path: '/book_worker',
      name: 'BookWorker',
      component: BookWorker,
      meta: {description: 'Book a worker', requiresAuth: true}
    },
    {
      path: '/labourer_registration',
      name: 'LabourerRegistration',
      component: LabourerRegistration,
      meta: {description: 'Register a labourer'}
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: AboutUs,
      meta: {description: 'About Us'}
    }
  ]
})
