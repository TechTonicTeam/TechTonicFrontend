import axios from "axios";

export const api_url = 'http://localhost:5000/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: api_url
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default $api