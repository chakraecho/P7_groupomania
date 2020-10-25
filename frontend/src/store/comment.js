import Vue from 'vue'

const comment = {
    namespaced:true,
    state: {
        active: false,
        comments: [],
        postId: '',
        optionId : '',
        option : false
    },
    getters: {
        activePostId: state => {
            return state.selectedPostId
        },
        option_comment(state){
            return state.comments.filter(x => x.commentId === state.optionId)[0]
        }
    },
    mutations: {
        addComment(state, { comments }) {
            state.comments = comments
        },
        setPostId(state, payload) {
            state.postId = payload
        },
        voidComment(state) {
            state.comment = {}
            state.postId = ''
        },
        activeComment(state) {
            console.log('called activeComment')
            state.active = true

        },
        desactiveComment(state) {
            state.active = false;
        },
        UPDATE_COMMENT(state, payload){
            const id = state.comments.findIndex(x => x.commentId == payload.commentId)
            Vue.set(state.comments, id , payload)
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
        setId({ commit }, { postId }) {
            commit('setPostId', postId)
            if (postId !== null) {
                fetch("http://localhost:3000/api/post/" + postId + "/comment", {
                    method: "GET",
                    credentials: "include",
                }).then((response) =>
                    response.json().then((res) => {
                        console.log(res.comment)
                        commit('addComment', { comments: res.comment });
                        commit('activeComment')
                    })
                );
            }
        },
        neutraliseComment({ commit }) {
            commit('voidComment')
            commit('desactiveComment')
        },
        open_sideoption({commit}, payload){
            commit("OPEN_OPTION", payload)
        }
    }
}

export default comment 