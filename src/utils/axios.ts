import axios from "axios";

const instance = axios.create({
  baseURL: 'http://192.168.1.12:3000',
  timeout: 3000
});



export default instance;