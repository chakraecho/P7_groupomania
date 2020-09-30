import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/login.vue"
import store from './../store/index.js'

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
    component: Login
  }
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
// auth verification
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    fetch(process.env.VUE_APP_BASE_URL +'/api/users/auth/verify', {
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
          next()
        }

      })
  }
  else if (from.name === 'login') {
    next()
  }
  else {
    fetch(process.env.VUE_APP_BASE_URL + '/api/users/auth/verify', {
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
export default router;
