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
        },
        IS_FOLLOWED(state){
            state.followed = true
        },
        IS_NOT_FOLLOWED(state){
            state.followed = false
        }
    },
    actions:{
        updateAccount({commit}, {firstName, lastName, imgUrl, bannerUrl, description}){
            commit('UPDATE_ACCOUNT', {firstName, lastName, imgUrl, bannerUrl, description} )
        },
        followRequest({commit, state},{from, to}){
            const body = JSON.stringify({from, to})
            if(state.followed === false){
                fetch("http://localhost:3000/api/users/follow",{method:'post', credentials:'include',
                body, headers:{"Content-Type": "application/json"}})
                    .then(()=> commit('IS_FOLLOWED'))
                    .catch(error => console.log(error))
            }
            else if(state.followed === true){
                fetch("http://localhost:3000/api/users/follow",{method:'delete', credentials:'include',
                body, headers:{"Content-Type": "application/json"}})
                    .then(()=> commit('IS_NOT_FOLLOWED'))
                    .catch(error => console.log(error))
            }
        },
        checkFollow({commit}, {from, to}){
            const body = JSON.stringify({from, to})
            fetch('http://localhost:3000/api/users/follow/check', {method:'post', credentials:'include',
        body:body, headers:{"Content-Type": "application/json"}})
        .then(res => {
            if(res.status === 204){
                commit('IS_NOT_FOLLOWED')
            }
            else if (res.status === 200){
                commit('IS_FOLLOWED')
            }
        })
        .catch(error => console.log({error}))
        }
    }
}

export default account