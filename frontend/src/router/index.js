import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import store from './../store/index'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/account/:id',
    name: 'account',
    component: () => import('../views/account.vue')

  },
  {
    path: '/groups',
    name: 'groups',
    component: () => import('../views/groupManager.vue')
  },
  {
    path: '/group/:id',
    name: "group",
    component: () => import('../views/group.vue')
  }, 
  {
    path: '/notification',
    name: "notifications",
    component: () => import('../views/notification.vue')
  },
  {
    path:'/admin/panel',
    name:'adminpanel',
    component: ()=> import('../views/admin.vue')
  }
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// auth verification
router.beforeEach((to, from, next) => {
  store.dispatch('comment/neutraliseComment')
  store.commit('post/DESACTIVE_POST')

  if (to.name === 'login') {
    fetch('http://localhost:3000/api/users/auth/verify', {
      method: 'post',
      credentials: 'include'
    })
      .then(res => {
        if (res.status === 200) {
          res.json().then((response) => {
            store.dispatch("user/login", {
              firstName: response.firstName,
              lastName: response.lastName,
              bannerUrl: response.bannerUrl,
              profilImgUrl: response.profilImgUrl,
              userId: response.userId
            }).then(() => {
              store.dispatch("handleAuth", true);
              next({ path: "/" })
            })
          });
        }
        else {
          store.dispatch("handleAuth", false);
          next()
        }

      })
        .catch(()=>{
          store.dispatch("handleAuth", false);
          next()
        })
  }
  else if (from.name === 'login') {
    next()
  }
  else {
    fetch('http://localhost:3000/api/users/auth/verify', {
      method: 'post',
      credentials: 'include'
    })
      .then(res => {
        if (res.status === 200) {
          res.json().then((response) => {
            store.dispatch("user/login", {
              firstName: response.firstName,
              lastName: response.lastName,
              bannerUrl: response.bannerUrl,
              profilImgUrl: response.profilImgUrl,
              userId: response.userId
            }).then(() => {
              store.commit("user/setAdmin", response.isAdmin)
              store.dispatch("handleAuth", true);
              next()
            })
          });
        }
        else {
          store.dispatch("handleAuth", false);
          next({ path: '/login' })
        }
      })
      .catch((error) => {
        console.log(error)
        store.dispatch("handleAuth", false);
        next({ path: '/login' })
      })
  }


}
)


export default router;
