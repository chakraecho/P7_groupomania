const comment = {
    namespaced:true,
    state: {
        active: false,
        comments: [],
        postId: ''
    },
    getters: {
        activePostId: state => {
            return state.selectedPostId
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
            state.active = false
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
        }
    }
}

export default comment 