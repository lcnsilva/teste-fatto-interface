import axios from 'axios';


const api_url = 'https://teste-fatto-api.onrender.com/'
const api = axios.create({
    baseURL: api_url
})
export default api