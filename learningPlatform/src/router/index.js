import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/page/HelloWorld'
import Index from '@/components/page/Index'
import UpdateArticle from '@/components/page/UpdateArticle'
import Article from '@/components/page/Article'
import Detail from '@/components/page/Detail'
import RunCode from '@/components/page/RunCode'
import RunCodeList from '@/components/page/RunCodeList'

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
    },
    {
      path: '/article',
      name: 'Article',
      component: Article
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/runCode',
      name: 'RunCode',
      component: RunCode
    },
    {
      path: '/runCodeList',
      name: 'RunCodeList',
      component: RunCodeList
    },
    
    
  ]
})
