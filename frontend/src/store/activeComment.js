const activeComment = {
    namespaced: true,
    state: {
        active: false,
        comments: {
        },
        selectedPostId: ''
    },
    getters: {
        activePostId: state => {
            return state.selectedPostId
        },
    },
    mutations: {
        addComment(state, { comments }) {
            state.comments = comments
        },
        setPostId(state, payload) {
            state.selectedPostId = payload
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
        },
        sendComment({ state,dispatch }, { content, userId }) {
            const body = JSON.stringify({ content, userId })
            fetch('http://localhost:3000/api/post/' + state.selectedPostId + '/comment', {
                credentials: "include",
                body,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(()=> dispatch('updateComment', {root:true}))
                .catch(error => console.log(error))
        },
        updateComment({commit, state}) {
            fetch('http://localhost:3000/api/post/' + state.selectedPostId + '/comment', {
                method: "GET",
                credentials: "include",
            })
                .then((response) =>
                    response.json().then((res) => {
                        console.log(res.comment)
                        commit('addComment', { comments: res.comment });
                    })
                )
                .catch(error => console.log(error))
        }
    }
}

export default activeComment