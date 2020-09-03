
const profil = {
    namespaced: true,
    state: {
      lastName:'',
      firstName:'',
      profilUrl: '',
      bannerUrl:'',
      profilImgUrl:'',
      userId:''
    },
    getters:{
      getFullName:(state)=>{
        return state.firstName+' '+state.lastName
      },
      profilAlt:(getters)=>{
        return 'Photo de profil de '+ getters.getFullName
      }
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
      atLogin({commit},{firstName, lastName, bannerUrl, profilImgUrl, userId}){
        commit('pushName', {firstName:firstName,lastName:lastName, userId});
        commit('pushBanner', {bannerUrl:bannerUrl});
        commit('pushProfilImgUrl',{profilImgUrl: profilImgUrl});
        commit('handleAuth', true)
      }
    }
  }

  export default profil