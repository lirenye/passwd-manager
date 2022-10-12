import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Home,
    children: 
    [
      {
        path: '',
        name: 'Home',
        meta: {
          title: '密码管理'
        },
        component: ()=> import('@/views/Default.vue')
      },
      {
        path: '/query',
        name: 'Query',
        meta: {
          title: '查询账户信息'
        },
        component: ()=> import('@/views/query/index.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=> import('@/views/login/index.vue')
  }
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next)=>{
  const token = window.sessionStorage.getItem('token');
  if(token){
    if(to.path !== '/login'){
      return next();
    }else{
      next('/');
    };
  }else{
    if(to.path !== '/login'){
      next('/login');
    }else{
      next();
    }
  }
})

export default router
