const notification = {
    namespaced:true,
    state:{
        notification:{}
    },
    mutations:{
        UPDATE_NOTIFICATION(state, payload){
            state.notification = payload
        }
    },
    actions:{
        updateNotifications({commit, rootState}){
            fetch('http://localhost:3000/api/users/notification/' + rootState.profil.userId, {
                credentials:'include',
                method:'get'
            })
            .then(response => response.json()
            .then(res => commit('UPDATE_NOTIFICATION', res.result) ))
            .catch(error => console.log(error))
        }
    }
}

export default notification