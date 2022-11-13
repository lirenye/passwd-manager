import axios, { AxiosError} from "axios";
import router from "@/router";
import { Notify } from "vant";

const instance = axios.create({
  baseURL: 'http://192.168.1.12:3000',
  timeout: 3000
});

instance.interceptors.request.use(config =>{
  config.headers!['Authorization'] = sessionStorage.getItem('token');
  return config;
});

instance.interceptors.response.use(response =>{
  return response;
}, (error: AxiosError) =>{
  if(error.response?.status === 401){
    sessionStorage.removeItem('token');
    router.replace('/login');
    Notify({type: 'warning', message: <string>error.response.data, duration: 1200});
  };
  return Promise.reject(error);
})

export default instance;