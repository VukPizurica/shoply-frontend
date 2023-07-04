import axios from 'axios';

const ShoplyAxios = axios.create({
  baseURL: 'http://localhost:8080/api',
  header:{ 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json' } 
});

ShoplyAxios.interceptors.request.use(
  function interceptor(config){
    const jwt = window.localStorage['jwt']
    if(jwt){
      config.headers['Authorization']="Bearer " + jwt
    }
    return config;
  }
);
export default ShoplyAxios;
