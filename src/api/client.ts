import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

import { config } from './config';

const api = axios.create({
  baseURL: config.baseURL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});
export const setRequestInterceptor = (appInstance: AxiosInstance) =>
  appInstance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
      //TODO: still no idea what here need improvements
      return config;
    },
    error => Promise.reject(error),
  );
export const setResponseInterceptor = (appInstance: AxiosInstance) =>
  appInstance.interceptors.response.use(
    response => {
      //TODO: do something with the response data
      return response.data;
    },
    error => Promise.reject(error),
  );
setRequestInterceptor(api);
setResponseInterceptor(api);
export default api;
