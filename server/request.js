import axios from 'axios'

let baseURL = 'https://www.gqgwr.cn:3658'
// let baseURL = 'https://localhost:3658'
// if( process.env.NODE_ENV === 'production' ) {
//     baseURL = 'https://localhost:3000'
// } else {
//     baseURL = 'https://www.gqgwr.cn:3000'
// }

axios.defaults.headers.common['Accept'] = '*/*';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 10000;

// 拦截器
axios.interceptors.response.use((response) => {
    return response
}, (error) => {
    return Promise.reject(error)
})
axios.interceptors.request.use((config) => {
    // Set headers first
    config.headers['Accept'] = '*/*';
    config.headers['Content-Type'] = 'application/json';
    
    // Then set other configuration properties
    config.baseURL = baseURL;
    config.timeout = 10000;
    return config;
}, (error) => {
    return Promise.reject(error)
})

// axios的get请求
export function getAxios({
    url,
    params={}
}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params,
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

// axios的post请求
export function postAxios({
    url,
    data,
    headers = {}
}) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'post',
            data,
            headers
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export default axios