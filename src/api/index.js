import axios from 'axios'
import { message } from 'antd';
import { LOCAL_ENV } from '@/common/localData'
import { createBrowserHistory } from 'history'
const showStatus = (status) => {
  let message = ''
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 402:
      message = '拒绝访问(402)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return `${message}，请检查网络或联系管理员！`
}

const service = axios.create({
  baseURL: LOCAL_ENV.VITE_API,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  timeout: 60000,
})

service.interceptors.request.use(
  config => {
    const token = localStorage.getItem(LOCAL_ENV.VITE_MAIN_KEY+'-token')
    if(token) {
      config.headers.authorization = token
    }
    return config
  },
  (err) => {
    err.message = '服务器异常，请联系管理员！'
    // 错误抛到业务代码
    return Promise.reject(err)
  }
)


service.interceptors.response.use(
  response => {
    const history = createBrowserHistory();
    if(response.status != 200) {
      if(!response.config.noMessage) {
        message.error(response.data.msg)  
      }
      return Promise.reject(err)
    }
    if(response.config.responseType=='blob') {
      return response
    }
    if(response.data.code == 401) {
      localStorage.removeItem(LOCAL_ENV.VITE_MAIN_KEY+'-token')
      history.replace(LOCAL_ENV.VITE_BASE_NAME+'/')
      return
    }
    if(response.data.code == 200) {
      return response.data.data
    }
    if(!response.config.cancelMessage) {
      message.error(response.data.msg)
    }
      
    return Promise.reject(response.data)
  },
  (err)=>{
    message.error(err.message || JSON.stringify(err))
    err.message =  '请求超时或服务器异常，请检查网络或联系管理员！'
    return Promise.reject(err)
  }
)

export default service