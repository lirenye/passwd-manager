import axios, { AxiosRequestConfig} from "axios";
import router from "@/router";

const instance = axios.create({
  baseURL: 'http://192.168.1.12:3000',
  timeout: 3000
});

instance.interceptors.request.use(config =>{
  config.headers!['Authorization'] = sessionStorage.getItem('token');
  return config;
});

instance.interceptors.response.use(response =>{
  const {data: res} = response;
  if(res.meta.status === 401) {
    sessionStorage.removeItem('token');
    router.replace('/login');
    return Promise.reject(response);
  };
  return response;
})

export default instance;