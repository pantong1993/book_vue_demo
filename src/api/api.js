import Axios from 'axios'


// 设置公共的url
Axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (sessionStorage.getItem('accessToken')) {
        config.headers.accessToken = sessionStorage.getItem('accessToken')
    }
    // 更改加载的样式
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 登录
export const hello = () => {
    return Axios.get('/api/v1/hello');
    // return Axios.get('http://127.0.0.1:5000/api/v1/hello');
};

// 作者增删改查
export const authorGetAll = () => {
    return Axios.get('/api/v1/author')
}

export const authorCreate = (params) => {
    return Axios.post('/api/v1/author', params)
}

export const authorGetOne = (id) => {
    return Axios.get(`/api/v1/author/${id}`)
}

export const authorUpdate = (id, params) => {
    return Axios.put(`/api/v1/author/${id}`, params)
}

export const authorDelete = (id) => {
    return Axios.delete(`/api/v1/author/${id}`)
}


export const bookGetAll = () => {
    return Axios.get('/api/v1/book')
}

export const bookUpdate = (id, params) => {
    return Axios.put(`/api/v1/book/${id}`, params)
}

export const bookCreate = (params) => {
    return Axios.post('/api/v1/book', params)
}

export const bookDelete = (id) => {
    return Axios.delete(`/api/v1/book/${id}`)
}

export const publisherGetAll = () => {
    return Axios.get('/api/v1/publisher')
}




