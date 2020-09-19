import Vue from 'vue'
import Vuex from 'vuex'
import profil from './profil.js'
import post from './post.js'
import activeComment from './activeComment.js'
import account from './account'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isAuth: false,
    hasFocus:false
  },
  mutations: {
    authYes(state){
      state.isAuth = true
    },
    authNo(state){
      state.isAuth = false
    },
    onFocus(state){
      state.hasFocus = true
    },
    outFocus(state){
      state.hasFocus = false
    }
  },
  actions: {
    handleAuth({commit}, session){
      if(session === true){
        commit('authYes')
      }
      else if(session === false){
        commit('authNo')
      }
    },
    handleFocus({commit},status){
      if(status === true){
        commit('outFocus')
      }
      else{
        commit('onFocus')
      }
    }
  },

  modules: {
    profil,
    post,
    activeComment,
    account
  }
})


