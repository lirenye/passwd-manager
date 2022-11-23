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
  const localTime = new Date().getTime().toString();
  config.headers!['Time'] = localTime;

  
  // 加密get请求数据
  if(config.method === 'get') {
    simpleCrypto.setSecret(localTime);
    config.params = {data: simpleCrypto.encrypt(config.params)}
    return config;
  };


  // 加密post请求数据
  simpleCrypto.setSecret(localTime);
  config.data = {
    data: simpleCrypto.encrypt(config.data)
  };
  
  return config;
});

instance.interceptors.response.use(response =>{
  if(typeof response.data === 'object') return response;

  const resTime = response.headers.time as string;
  const resSecret = resTime;
  simpleCrypto.setSecret(resSecret);
  response.data  =  simpleCrypto.decrypt(response.data)
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