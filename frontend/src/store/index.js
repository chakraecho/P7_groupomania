import Vue from "vue";
import Vuex from "vuex";
import user from './user'
import post from './post'
import comment from './comment'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: false,
    },
  mutations: {
    loggingIn(state){
      state.isAuth = true
    },
    disconnecting(state){
      state.isAuth = false
    }
  },
  actions: {
    handleAuth({commit}, session){
      if(session === true){
        commit('loggingIn')
      }
      else if(session === false){
        commit('disconnecting')
      }
    }
  },
  modules: {
    user,
    post,
    comment
  }
});
