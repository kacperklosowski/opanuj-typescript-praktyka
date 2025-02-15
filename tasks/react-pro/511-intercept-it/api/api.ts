import axios , {InternalAxiosRequestConfig} from 'axios';
import { Product } from '../model/Product';
import {trackSlowRequests} from './tracker';

interface AxiosRequestConfig extends InternalAxiosRequestConfig {
  reqStartTime?: number;
}

const SLOW_REQUEST_THRESHOLD = 5000;

const productsApi = axios.create({
  baseURL: 'https://dummyjson.com',
});

productsApi.interceptors.request.use((config: AxiosRequestConfig) => {
  config.reqStartTime = Date.now();
  return config;
});

productsApi.interceptors.response.use((response) => {
  const {url, reqStartTime} = response.config as AxiosRequestConfig;

  if (url && reqStartTime) {
    const duration = Date.now() - reqStartTime;

    if (duration >= SLOW_REQUEST_THRESHOLD) {
      trackSlowRequests(duration, url);
    }
  }

  return response;
});

export async function getProducts(query: string, limit: number = 5, delay: number = 0) {
  const response = await productsApi.get<{ products: Product[] }>('/products/search', {
    params: {
      q: query,
      limit: limit,
      delay: delay,
    },
  });
  return response;
}
