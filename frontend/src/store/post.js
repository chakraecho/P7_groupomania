const post = {
    nameSpaced: true,
    actions: {
        getAllPost() {
            return new Promise((resolve, reject) => {
                fetch('localhost:3000/api/post', { method: 'GET', credentials: 'include' })
                .then(res => res.json().then(
                    response => {
                        resolve(response)
                    }
                ))
                .catch(error => reject(error))
            })
        }
    }
}

export default post