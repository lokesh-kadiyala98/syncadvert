import axios from 'axios'
import { toast } from 'react-toastify'

// axios.interceptors.request.use(config => {
//     const token = getJwt()

//     if (token)
//         config.headers['Authorization'] = `Bearer ${token}`

//     return config
// }, error => {
//     Promise.reject(error)
// })

axios.interceptors.response.use(null, error => {
    const expectedError = 
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
    
    if (error.response.status === 401)
        toast.error(error.response.message)
    
    if (!expectedError)
        toast.error("An unexpected error occurred.")

    return Promise.reject(error)
})

function setJwt(token) {
    if (token)
        axios.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
}