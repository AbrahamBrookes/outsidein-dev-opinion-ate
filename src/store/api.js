import axios from 'axios'

const heroku_api_key = '1xYU87pyIfSPT9t9Pwrlv2QooZowK3iQ'

const client = axios.create({
    baseURL: 'https://outside-in-dev-api.herokuapp.com/' + heroku_api_key,
})

const api = {
    loadRestaurants(){
        return client.get('/restaurants').then(response => response.data)
    },
}

export default api