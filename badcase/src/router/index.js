import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/login/login.vue'
import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/home/home.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      name:'home',
      path: '/',
      redirect: '/policy',
      component: Home,
      children:[
        {
        name:'website',
        path:'website',
        component: () => import(/* webpackChunkName: "TextAudit" */"@/views/website/Website.vue")
      },{
        name:'policy',
        path:'policy',
        component: () => import(/* webpackChunkName: "TextAudit" */'@/views/policy/Policy.vue')
      },
      {
        name:'baseUplode',
        path:'baseUplode',
        component: () => import(/* webpackChunkName: "TextAudit" */'@/views/policy/baseUplode.vue')
      },
      {
        name:'faceRepeat',
        path:'faceRepeat',
        component: () => import(/* webpackChunkName: "TextAudit" */'@/views/policy/faceRepeat.vue')
      },
      {
        name:'dedailPage',
        path:'dedailPage',
        component: () => import(/* webpackChunkName: "TextAudit" */'@/views/policy/dedailPage.vue')
      },
      {
        name:'addWebsite',
        path:'addWebsite',
        component: () => import(/* webpackChunkName: "TextAudit" */'@/views/website/AddWebsite.vue')
      },
      {
        name:'files',
        path: 'files',
        component: () => import(/* webpackChunkName: "TextAudit" */'@/views/files/files.vue')
       
      },
    ]
    },
    // {
    //   name:'login',
    //   path: '/login',
    //   component: Login
     
    // },
    
    
  ]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next();
//   } else {
//     let token = sessionStorage.getItem('token');
//       console.log('全局守卫token：'+token)
//     if (token === null || token === '') {
    
//       //console.log('验证失败token：')
//       alert('请先登录');
//       next('/login');
      
//     } else {
//       next();
//     }
//   }
// });
 
export default router;
