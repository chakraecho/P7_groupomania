const user = {
    state:{
        firstName:'',
        lastName:'',
        bannerUrl:'',
        profilImgUrl:'',
        userId:''
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
          }
    },
    actions:{
        login({commit}, {firstName, lastName, userId, bannerUrl, profilImgUrl}){
            commit('pushName', {firstName, lastName, userId})
            commit('pushBanner', {bannerUrl})
            commit('pushProfilUrl', {profilImgUrl})           
        }
    }
}

export default user