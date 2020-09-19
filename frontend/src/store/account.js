const account = {
    namespaced: true,
    state:{
        firstName:'',
        lastName:'',
        imgUrl:'',
        bannerUrl:'',
        description:'',
        followed: false
    },
    getters:{
        getFullName(state){
            return state.firstName + ' ' + state.lastName
        }
    },
    mutations:{
        UPDATE_ACCOUNT(state, {firstName, lastName, imgUrl, bannerUrl, description}){
            state.firstName = firstName
            state.lastName = lastName
            state.imgUrl = imgUrl
            state.bannerUrl = bannerUrl
            state.description = description
        }
    },
    actions:{
        updateAccount({commit}, {firstName, lastName, imgUrl, bannerUrl, description}){
            commit('UPDATE_ACCOUNT', {firstName, lastName, imgUrl, bannerUrl, description} )
        }
    }
}

export default account