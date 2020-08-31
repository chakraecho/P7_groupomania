import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'home',
    component: home
  }, 
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

export const router = new VueRouter({
  mode:'history',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.name==='login'){
    fetch('http://localhost:3000/api/users/auth/verify', {
      method: 'post',
      credentials: 'include'
    })
      .then(response => {
        if (response.status === 200) {
            next({ path: '/' })
        }
        else {
          next()
        }
  
      })
  }
  else{
    fetch('http://localhost:3000/api/users/auth/verify', {
      method: 'post',
      credentials: 'include'
    })
      .then(response => {
        if (response.status === 200) {
            next()
        }
        else {
          next({ path: '/login' })
        }
  
      })
  }


}
)
export default router
