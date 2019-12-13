import axios from 'axios'

export default function (vm) {
  axios.interceptors.request.use(config => {
    //把token取出放在request中
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  });

  //token过期，服务器返回401，注销
  axios.interceptors.response.use(null, err => {
    if (err.response.status === 401) {
      //清空
      vm.$store.dispatch('logout');
      //跳转
      vm.$router.push('/login')
    }
    //抛出错误，下一层可能用到
    return Promise.reject(err);
  });
}