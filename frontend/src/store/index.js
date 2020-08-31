import Vue from 'vue'
import Vuex from 'vuex'
import profil from './profil.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isAuth: false
  },
  mutations: {
    authYes(state){
      state.isAuth = true
    },
    authNo(state){
      state.isAuth = false
    },
  },
  actions: {
    handleAuth({commit}, session){
      if(session === true){
        commit('authYes')
      }
      else if(session === false){
        commit('authNo')
      }
    }
  },

  modules: {
    profil
  }
})


export default store