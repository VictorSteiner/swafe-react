/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Login, NewPassword, Token, User as UUser } from '../api/__generated__';
import { AxiosResponse } from 'axios';
import { instance, IService } from '.';
import { NoUndefinedField } from '../api/types';

const endpoint = `/Users`;

export type UserDTO = NoUndefinedField<
  Omit<User, 'personalTrainerId' | 'userId'>
>;

export type User = NoUndefinedField<UUser>;

interface IUserService extends IService<User, string, UserDTO> {
  login: (input: Login) => Promise<AxiosResponse<Token>>;
  changePassword: (input: NewPassword) => Promise<AxiosResponse<Token>>;
  getClients: () => Promise<AxiosResponse<User[]>>;
  getTrainer: () => Promise<AxiosResponse<User>>;
}

export const userService: IUserService = {
  login: async (input) =>
    await instance.post<Token>(`${endpoint}/login`, input),
  changePassword: async (input) =>
    await instance.put<Token>(`${endpoint}/Password`, input),
  getClients: async () => await instance.get<User[]>(`${endpoint}/clients`),
  getTrainer: async () => await instance.get<User>(`${endpoint}/trainer`),
  getAll: async () => await instance.get<User[]>(endpoint),
  getSingle: async (id) => await instance.get<User>(`${endpoint}/${id}`),
  create: async (input) => await instance.post<User>(endpoint, input),
  update: async (input) =>
    await instance.put(`${endpoint}/${input.userId}`, input),
  delete: async (id) => await instance.delete(`${endpoint}/${id}`),
};
