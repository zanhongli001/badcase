// import Vue from 'vue'
// import Router from 'vue-router'

// Vue.use(Router)

// /* Layout */
// import Layout from '@/layout'

// /**
//  * Note: sub-menu only appear when route children.length >= 1
//  * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
//  *
//  * hidden: true                   if set true, item will not show in the sidebar(default is false)
//  * alwaysShow: true               if set true, will always show the root menu
//  *                                if not set alwaysShow, when item has more than one children route,
//  *                                it will becomes nested mode, otherwise not show the root menu
//  * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
//  * name:'router-name'             the name is used by <keep-alive> (must set!!!)
//  * meta : {
//     roles: ['admin','editor']    control the page roles (you can set multiple roles)
//     title: 'title'               the name show in sidebar and breadcrumb (recommend set)
//     icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
//     breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
//     activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
//   }
//  */

// /**
//  * constantRoutes
//  * a base page that does not have permission requirements
//  * all roles can be accessed
//  */
// export const constantRoutes = [
//   {
//     path: '/login',
//     component: () => import('@/views/login/index'),
//     hidden: true
//   },

//   {
//     path: '/404',
//     component: () => import('@/views/404'),
//     hidden: true
//   },

//   {
//     path: '/',
//     component: Layout,
//     redirect: '/home',
//     children: [{
//       path: '/home',
//       name: 'Home',
//       component: () => import('@/views/home/home'),
//       meta: { title: 'Dashboard', icon: 'dashboard' }
//     }]
//   },



//   {
//     path: '/badTool',
//     component: Layout,
//     redirect: '/badTool/table',
//     name: 'BadTool',
//     meta: { title: '工具', icon: 'el-icon-s-help' },
//     children: [
//       {
//         path: 'policy',
//         name: 'Policy',
//         component: () => import('@/views/policy/Policy'),
//         meta: { title: '底库数据', icon: 'table' },

//       },
//       {
//         path: 'website',
//         name: 'Website',
//         component: () => import('@/views/website/Website'),
//         meta: { title: 'badcase反馈', icon: 'tree' }
//       },
//       {
//         name:'baseUplode',
//         path:'baseUplode',
//         component: () => import(/* webpackChunkName: "TextAudit" */'@/views/policy/baseUplode.vue'),

//       },
//       {
//         name:'faceRepeat',
//         path:'faceRepeat',
//         component: () => import(/* webpackChunkName: "TextAudit" */'@/views/policy/faceRepeat.vue')
//       },
//       {
//         name:'dedailPage',
//         path:'dedailPage',
//         component: () => import(/* webpackChunkName: "TextAudit" */'@/views/policy/dedailPage.vue')
//       },
//       {
//         name:'badUplode',
//         path: 'badUplode',
//         component: () => import(/* webpackChunkName: "TextAudit" */'@/views/website/badUplode')

//       },
//       {
//         name:'badDetails',
//         path: 'badDetails',
//         component: () => import(/* webpackChunkName: "TextAudit" */'@/views/website/badDetails')

//       },
//     ]
//   },

//   {
//     path: '/badText',
//     component: Layout,
//     redirect: '/badText/table',
//     name: 'BadText',
//     meta: { title: '文档', icon: 'el-icon-s-help' },
//     children: [
//       {
//         name:'policyText',
//         path: 'policyText',
//         component: () => import('@/views/files/policyText'),
//         meta: { title: '底库数据搜集文档', icon: 'table' }
//       },
//       {
//         name:'badText',
//         path: 'badText',
//         component: () => import('@/views/files/badText.vue'),
//         meta: { title: 'badcase说明文档', icon: 'tree' }
//       }
//     ]
//   },




//   // 404 page must be placed at the end !!!
//   { path: '*', redirect: '/404', hidden: true }
// ]

// const createRouter = () => new Router({
//   // mode: 'history', // require service support
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRoutes
// })

// const router = createRouter()

// // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

// export default router



import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/login/login.vue'
import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/home/home.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      redirect: '/policy',
      component: Home,
      children: [
        {
          path: '/policy',
          name: 'policy',
          component: () => import(/* webpackChunkName: "TextAudit" */'@/views/policy/Policy.vue')
        },
        {
          path: '/baseUplode',
          name: 'baseUplode',
          component: () => import(/* webpackChunkName: "TextAudit" */'@/views/policy/baseUplode.vue')
        },
        {
          path: '/dedailPage',
          name: 'dedailPage',
          component: () => import(/* webpackChunkName: "TextAudit" */'@/views/policy/dedailPage.vue')
        },

        {
          path: '/website',
          name: 'website',
          component: () => import(/* webpackChunkName: "TextAudit" */"@/views/website/Website.vue"),
        },
        {
          path: '/badUplode',
          name: 'badUplode',
          component: () => import(/* webpackChunkName: "TextAudit" */'@/views/website/badUplode')

        },
        {
          path: '/badDetails',
          name: 'badDetails',
          component: () => import(/* webpackChunkName: "TextAudit" */'@/views/website/badDetails')

        },
        {
          path: '/policyText',
          name: 'policyText',
          component: () => import(/* webpackChunkName: "TextAudit" */'@/views/files/policyText.vue')

        },
        {
          path: '/badText',
          name: 'badText',
          component: () => import(/* webpackChunkName: "TextAudit" */'@/views/files/badText.vue')

        },
      ]
    },
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
