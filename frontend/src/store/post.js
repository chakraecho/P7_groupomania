import Vue from "vue"

const post = {
    namespaced:true,
    state:{
        posts:[],
        optionId : '',
        option : false
    },
    mutations:{
        changePost(state, payload){
            state.posts = payload
        },
        UPDATE_POST(state, payload) {
            const id = state.posts.findIndex(x => x.postId == payload.postId)
            Vue.set(state.posts, id , payload)
        },
        OPEN_OPTION(state, payload){
            Vue.set(state, 'optionId', payload)
            Vue.set(state, 'option', true)

        },
        CLOSE_OPTION(state){
            Vue.set(state, 'optionId', null)
            Vue.set(state, 'option', false)
        }
    },
    actions: {
        loadPost({commit},payload){
            commit('changePost', payload)
        },
        open_sideoption({commit}, payload){
            commit("OPEN_OPTION", payload)
        }
    }
}

export default post