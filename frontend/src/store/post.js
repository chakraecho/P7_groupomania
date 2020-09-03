const post = {
    nameSpaced: true,

    actions: {
        sendPost({userId, content, img}){
            const body = JSON.stringify(userId,content,img)
            fetch('http://localhost:3000/api/post/submit',{method:'post', credentials:'include', body})
            
        }
    }
}

export default post