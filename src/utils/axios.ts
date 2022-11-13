import axios, { AxiosError, AxiosRequestConfig} from "axios";
import router from "@/router";
import { Notify } from "vant";
import SimpleCrypto from "simple-crypto-js";

const simpleCrypto = new SimpleCrypto('');

const instance = axios.create({
  baseURL: 'http://192.168.1.12:3000',
  timeout: 3000
});

instance.interceptors.request.use((config: AxiosRequestConfig) =>{
  config.headers!['Authorization'] = sessionStorage.getItem('token');
  
  // 加密请求数据
  const localTime = new Date().getTime().toString();
  config.headers!['Time'] = localTime;

  simpleCrypto.setSecret(localTime);
  config.data = {
    data: simpleCrypto.encrypt(config.data)
  };
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