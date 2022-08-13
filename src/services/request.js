import { BASE_URL, TIMEOUT } from "./config";
import axios from 'axios';


const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

instance.interceptors.request.use(config => {
  return config;
}, err => {
  console.log(err);
});

instance.interceptors.response.use(res => {
  const data = res.data;
  // console.log('响应拦截器', data);
  return data;
}, err => {
  console.log(err);
});

export default instance;

