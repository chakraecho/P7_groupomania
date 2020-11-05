import Vue from "vue";
import Vuex from "vuex";
import user from './user'
import post from './post'
import comment from './comment'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: false,
    snackbar : false,
    snackColor:"",
    snackMsg:""

    },
  mutations: {
    loggingIn(state){
      state.isAuth = true
    },
    disconnecting(state){
      state.isAuth = false
    },
    ACTIVE_SNACK(state){
      Vue.set(state, "snackbar", true)
    },
    CLOSE_SNACK(state){
      Vue.set(state, "snackbar", false)
    },
    SNACK_COLOR(state, payload){
      Vue.set(state, "snackColor", payload)
    },
    SNACK_MSG(state, payload){
      Vue.set(state, "snackMsg", payload)
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
    },
    activateSnack({commit}, {color, msg}){
      commit('ACTIVE_SNACK')
      commit('SNACK_COLOR', color)
      commit('SNACK_MSG', msg)
    }
  },
  modules: {
    user,
    post,
    comment
  }
});
