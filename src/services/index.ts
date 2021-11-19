import axios, { AxiosResponse } from 'axios';

export interface IService<TEntity, TKey, TDTO> {
  getAll: () => Promise<AxiosResponse<TEntity[]>>;
  getSingle: (id: TKey) => Promise<AxiosResponse<TEntity>>;
  create: (input: TDTO) => Promise<AxiosResponse<TEntity>>;
  update: (input: TEntity) => void;
  delete: (id: TKey) => void;
}

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (!!token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});
