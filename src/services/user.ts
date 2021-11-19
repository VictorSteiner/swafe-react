import { Login, NewPassword, Token, User } from '../api/__generated__';
import axios, { AxiosResponse } from 'axios';
import { IService } from '.';

const endpoint = `${process.env.REACT_APP_API_URL}/Users`;
const token = localStorage.getItem('token') || null;
const authorization = { Authorization: `Bearer ${token}` };

export type UserDTO = Omit<User, 'personalTrainerId' | 'userId'>;

interface IUserService extends IService<User, string, UserDTO> {
  login: (input: Login) => Promise<AxiosResponse<Token>>;
  changePassword: (input: NewPassword) => Promise<AxiosResponse<Token>>;
  getClients: () => Promise<AxiosResponse<User[]>>;
  getTrainer: () => Promise<AxiosResponse<User>>;
}

export const userService: IUserService = {
  login: async (input) => await axios.post<Token>(`${endpoint}/login`, input),
  changePassword: async (input) =>
    await axios.post<Token>(`${endpoint}/Password`, input, {
      headers: authorization,
    }),
  getClients: async () =>
    await axios.get<User[]>(`${endpoint}/clients`, { headers: authorization }),
  getTrainer: async () =>
    await axios.get<User>(`${endpoint}/trainer`, { headers: authorization }),
  getAll: async () =>
    await axios.get<User[]>(endpoint, { headers: authorization }),
  getSingle: async (id) =>
    await axios.get<User>(`${endpoint}/${id}`, {
      headers: authorization,
    }),
  create: async (input) =>
    await axios.post<User>(endpoint, input, { headers: authorization }),
  update: async (input) =>
    await axios.put(`${endpoint}/${input.userId}`, input, {
      headers: authorization,
    }),
  delete: async (id) =>
    await axios.delete(`${endpoint}/${id}`, {
      headers: authorization,
    }),
};
