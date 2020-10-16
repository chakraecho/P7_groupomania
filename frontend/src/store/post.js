import Vue from "vue"

const post = {
    namespaced:true,
    state:{
        posts:[]
    },
    mutations:{
        changePost(state, payload){
            state.posts = payload
        },
        UPDATE_POST(state, payload) {
            const id = state.posts.findIndex(x => x.postId == payload.postId)
            Vue.set(state.posts, id , payload)
        }
    },
    actions: {
        loadPost({commit},payload){
            commit('changePost', payload)
        }
    }
}

export default post