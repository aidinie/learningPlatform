import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/page/HelloWorld'
import Index from '@/components/page/Index'
import UpdateArticle from '@/components/page/UpdateArticle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/oprArticle',
      name: 'UpdateArticle',
      component: UpdateArticle
    }
  ]
})
