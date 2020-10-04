const post = {
    namespaced:true,
    state:{
        posts:[]
    },
    mutations:{
        changePost(state, payload){
            state.posts = payload
        }
    },

    actions: {
        loadPost({commit},payload){
            commit('changePost', payload)
        }
    }
}

export default post