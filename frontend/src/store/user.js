import Vue from 'vue'

const getUserInit = ()=>{
  return {
    firstName:'',
    lastName:'',
    bannerUrl:'',
    profilImgUrl:'',
    userId:''
  }
}

const user = {
  namespaced:true,
    state:{
        firstName:'',
        lastName:'',
        bannerUrl:'',
        profilImgUrl:'',
        userId:'',
        isAdmin : false
    },
    mutations:{
        pushName(state, {firstName, lastName, userId}){
            state.firstName = firstName
            state.lastName = lastName
            state.userId = userId
          },
          pushBanner(state, {bannerUrl}){
            state.bannerUrl = bannerUrl
          },
          pushProfilImgUrl(state, {profilImgUrl}){
            state.profilImgUrl = profilImgUrl
          },
        setAdmin(state, payload){
          Vue.set(state, 'isAdmin', payload)
        },
          DISCONNECT(state){
            Object.assign(state, getUserInit)
          }
    },
    actions:{
        login({commit}, {firstName, lastName, userId, bannerUrl,profilImgUrl}){
            commit('pushName', {firstName, lastName, userId})
            commit('pushBanner', {bannerUrl})
            commit('pushProfilImgUrl', {profilImgUrl})
        },
        disconnect({commit}){
          commit('DISCONNECT')
        }
    }
}

export default user