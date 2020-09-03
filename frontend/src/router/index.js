import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import {store} from './../store/index'

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
  console.log(store)
  if(to.name==='login'){
    fetch('http://localhost:3000/api/users/auth/verify', {
      method: 'post',
      credentials: 'include'
    })
      .then(res => {
        if (res.status === 200) {
          res.json().then((response) => {
            store.dispatch("profil/atLogin", {
              firstName: response.firstName,
              lastName: response.lastName,
              bannerUrl: response.bannerUrl,
              profilImgUrl: response.profilImgUrl,
              userId: response.userId
            }).then(()=>{
              store.dispatch("handleAuth", true);
              next({path:"/"})
            })
          });
        }
        else {
          next()
        }
  
      })
  }
  else if( from.name === 'login'){
    next()
  }
  else{
    fetch('http://localhost:3000/api/users/auth/verify', {
      method: 'post',
      credentials: 'include'
    })
      .then(res => {
        if (res.status === 200) {
          res.json().then((response) => {
            store.dispatch("profil/atLogin", {
              firstName: response.firstName,
              lastName: response.lastName,
              bannerUrl: response.bannerUrl,
              profilImgUrl: response.profilImgUrl,
              userId:response.userId
            }).then(()=>{
              store.dispatch("handleAuth", true);
              next()
            })
          });
        }
        else {
          next({ path: '/login' })
        }
      })
  }


}
)
export default router
