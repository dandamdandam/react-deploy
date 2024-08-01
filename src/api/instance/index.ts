import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { authSessionStorage } from '@/utils/storage';

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authSessionStorage.get()?.token ?? ''}`,
      ...config.headers,
    },
  });

  return instance;
};

export const BASE_URL = 'https://api.example.com';
export const fetchInstance = (baseURL?: string) => {
  return initInstance({
    baseURL: baseURL ?? BASE_URL,
  });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});
