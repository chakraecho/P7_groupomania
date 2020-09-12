const post = {
    namespaced:true,
    state:{
        posts:{}
    },
    mutations:{
        changePost(state, payload){
            state.posts = payload
        }
    },

    actions: {
        sendPost(context,{userId, content, img}){
            const body = JSON.stringify({userId,content,img})
            console.log(body)
            fetch('http://localhost:3000/api/post/submit',{method:'post', credentials:'include', body, headers:{'Content-Type':'application/json'}})

        },
        addPost({commit},payload){
            commit('changePost', payload)
        }
    }
}

export default post