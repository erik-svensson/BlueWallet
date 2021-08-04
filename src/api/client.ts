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
    console.info(request);
    console.info('http', `--> ${request.method?.toUpperCase()} ${request.baseURL}${request.url}`);

    return request;
  };

  const onResponse = (response: AxiosResponse<any>) => {
    console.info(response);
    console.info('http', `<-- ${response.status} ${response.config.baseURL}${response.config.url}`);

    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  };

  const onError = (error: AxiosError) => {
    if (error.response) {
      console.error('http', `<-- ${error.response.status} ${error.config.baseURL}${error.config.url}`);
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
