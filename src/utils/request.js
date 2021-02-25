// import { message } from 'antd';
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

axios.defaults.withCredentials = true
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // config.headers['Access-Control-Allow-Origin']= "*"
    // config.headers["Access-Control-Allow-Headers"]= "X-Requested-With";
    // config.headers["Access-Control-Allow-Methods"]="PUT,POST,GET,DELETE,OPTIONS";
    // config.headers['Access-Control-Allow-Headers']='Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild';
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['JSESSIONID'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    const status_code=res.code
    const message=res.msg
    console.log('res',res)
    
    // if the custom code is not 20000, it is judged as an error.
      if (status_code !== 200) {
      Message({
        message: message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (status_code === 401) {
        // to re-login
        MessageBox.confirm('您在页面停留太久已经退出，请重新登录', '确认', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // debugger
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 5000
    })
    // store.dispatch('user/resetToken').then(() => {
    //   location.reload()
    // })
    return Promise.reject(error)
  }
)

export default service
