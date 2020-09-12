const activeComment = {
    namespaced:true,
    state:{
        comments:{

        },
        postId:{}
    },
    mutations:{
        addComment(state, payload){
            state.comment = payload
        },
        setPostId(state, payload){
            state.postId = payload
        },
        voidComment(state){
            state.comment = {}
            state.postId = ''
        }
    },
    actions:{
        fetchComment({commit}, {comments, postId}){
            commit('addComment', comments);
            commit('setPostId', postId)
        },
        neutraliseComment({commit}){
            commit('voidComment')
        }
    }
}

export default activeComment