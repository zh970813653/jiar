import axios from 'axios'
import {getToken} from '../auth-provider'
import * as auth from 'auth-provider'
import {notification} from 'antd'


const apiUrl = process.env.REACT_APP_API_URL;


const http = axios.create({
  timeout: 100000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})


http.interceptors.request.use(
  (config) => {
    const token = getToken()
    config.headers = {
      'Authorization': `Bearer ${token}`,
    }
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
);


http.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      auth.logout()
      window.location.reload()
      alert('token失效 重新登录')
      return Promise.reject('token失效 重新登录')
    }
    return response;
  },
  (error) => {
    const {response} = error
    notification.error({
      message: '请求错误',
      description: response.data.message,
      duration: 2
    })
    // alert(response.data.message)
    return Promise.reject(response)
  }
);

export default http