import Vue from 'vue'
import Router from 'vue-router'
import hello from '@/components/hello'
import deleteVue from '@/components/delete'
import upload from '@/components/upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: hello
    },
    {
      path: '/delete',
      name: 'delete',
      component: deleteVue
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    }
  ]
})
