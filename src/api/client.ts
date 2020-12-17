import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

import { config } from './config';

export const createApiInstance = () =>
  axios.create({
    baseURL: config.baseURL,
    headers: { Accept: 'application/json' },
  });

const api = createApiInstance();

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

      return response;
    },
    error => Promise.reject(error),
  );

setRequestInterceptor(api);
setResponseInterceptor(api);

export default api;
