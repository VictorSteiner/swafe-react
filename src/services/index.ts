import { AxiosResponse } from 'axios';

export interface IService<TEntity, TKey, TDTO> {
  getAll: () => Promise<AxiosResponse<TEntity[]>>;
  getSingle: (id: TKey) => Promise<AxiosResponse<TEntity>>;
  create: (input: TDTO) => Promise<AxiosResponse<TEntity>>;
  update: (input: TEntity) => void;
  delete: (id: TKey) => void;
}
