const activeComment = {
    namespaced:true,
    state:{
        active:false,
        comments:{
        },
        selectedPostId:''
    },
    getters:{
        activePostId: state => {
        return state.selectedPostId
    }},
    mutations:{
        addComment(state, payload){
            state.comment = payload
        },
        setPostId(state, payload){
            state.selectedPostId = payload
        },
        voidComment(state){
            state.comment = {}
            state.postId = ''
        },
        activeComment(state){
            state.activeComment = true
        },
        desactiveComment(state){
            state.activeComment = false
        }
    },
    actions:{
        fetchComment({commit}, {comments}){
            commit('addComment', comments);
            commit('activeComment')
        },
        setId({commit},{postId}){
            console.log('set ID called')
            commit('setPostId', postId)
        },
        neutraliseComment({commit}){
            commit('voidComment')
            commit('desactiveComment')
        }
    }
}

export default activeComment