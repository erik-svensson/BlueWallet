import { HttpError } from 'app/../error/AppErrors';
import logger from 'app/../logger';
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

export enum GeneralHttpError {
  NO_RESPONSE = 'No response',
  NO_MESSAGE = 'No message',
}

const createHttpClient = (baseUrl: string) => {
  const httpClient = axios.create({
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json' },
  });

  const onRequest = (request: AxiosRequestConfig) => {
    console.log(`--> ${request.method?.toUpperCase()} ${request.baseURL}${request.url}`);
    // logger.info('http', `--> ${request.method?.toUpperCase()} ${request.baseURL}${request.url}`);

    return request;
  };

  const onResponse = (response: AxiosResponse<any>): AxiosResponse<any> => {
    // logger.info('http', `<-- ${response.status} ${response.config.baseURL}${response.config.url}`);
    console.log(`<-- ${response.status} ${response.config.baseURL}${response.config.url}`);

    return response;
  };

  const onError = (error: AxiosError) => {
    if (error.response) {
      console.error(`<-- ${error.response.status} ${error.config.baseURL}${error.config.url}`);
      // logger.error('http', `<-- ${error.response.status} ${error.config.baseURL}${error.config.url}`);
    }

    if (!error?.response) {
      throw new HttpError(`Request to ${baseUrl} failed. Details: No response`);
    }

    const message = error.response?.data.msg || 'No message';

    throw new HttpError(`Request to ${error.config.url} failed. Details: ${message}`);
  };

  httpClient.interceptors.request.use(request => onRequest(request));
  httpClient.interceptors.response.use(
    response => onResponse(response),
    error => onError(error),
  );

  return httpClient;
};

export default createHttpClient;
