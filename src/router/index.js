import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView'
import DetailView from '@/components/DetailView'
import PostView from '@/components/PostView'
import CameraView from '@/components/CameraView'
import NewView1 from '@/components/NewView1'
import NewView2 from '@/components/NewView2'
import NewView3 from '@/components/NewView3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/newview1',
      name: 'home',
      component: HomeView
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView
    },
    {
      path: '/post',
      name: 'post',
      component: PostView
    },
    {
      path: '/camera',
      name: 'camera',
      component: CameraView
    },
    {
      path: '/',
      name: 'newview1',
      component: NewView1
    },
    {
      path: '/newview2',
      name: 'newview2',
      component: NewView2
    },
    {
      path: '/newview3',
      name: 'newview3',
      component: NewView3
    }
  ]
})
