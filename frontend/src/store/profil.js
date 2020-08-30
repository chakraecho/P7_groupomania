const profil = {
    namespaced: true,
    state: {
      lastName:'',
      firstName:'',
      profilUrl: '',
      bannerUrl:'',
      profilImgUrl:'',
    },
    getters:{
      getFullName:(state)=>{
        return state.firstName+' '+state.lastName
      },
      profilAlt:()=>{
        return 'Photo de profil de '+this.getFullName
      }
    },
    mutations:{
      pushName(state, {firstName, lastName}){
        state.firstName = firstName
        state.lastName = lastName
      },
      pushBanner(state, {bannerUrl}){
        state.bannerUrl = bannerUrl
      },
      pushProfilImgUrl(state, {profilImgUrl}){
        state.profilImgUrl = profilImgUrl
      }
    },
    actions:{
      atLogin({commit},{firstName, lastName, bannerUrl, profilImgUrl}){
        commit('pushName', {firstName:firstName,lastName:lastName});
        commit('pushBanner', {bannerUrl:bannerUrl});
        commit('pushProfilImgUrl',{profilImgUrl: profilImgUrl})
      }
    }
  }

  export default profil