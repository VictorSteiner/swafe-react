import { Login, NewPassword, Token, User } from '../__generated__';
import axios from 'axios';
import { UserCreateDTO } from '../types';

const endpoint = `${process.env.REACT_APP_API_URL}/Users`;
const token = localStorage.getItem('token') || null;
const authorization = { Authorization: `Bearer ${token}` };

export function login(request: Login) {
  return axios.post<Token>(`${endpoint}/login`, request);
}

export function changePassword(request: NewPassword) {
  return axios.post<Token>(`${endpoint}/Password`, request, {
    headers: authorization,
  });
}

export function getUsers() {
  return axios.get<User[]>(endpoint, { headers: authorization });
}

export function createUser(request: UserCreateDTO) {
  return axios.post<User>(endpoint, request, { headers: authorization });
}

export function getClients() {
  return axios.get<User[]>(`${endpoint}/clients`, { headers: authorization });
}

export function getTrainer() {
  return axios.get<User>(`${endpoint}/trainer`, { headers: authorization });
}

export function getUser(id: string) {
  return axios.get<User>(`${endpoint}/${id}`, {
    headers: authorization,
  });
}

export function updateUser(request: User) {
  return axios.put(`${endpoint}/${request.userId}`, request, {
    headers: authorization,
  });
}

export function deleteUser(id: string) {
  return axios.delete(`${endpoint}/${id}`, {
    headers: authorization,
  });
}
