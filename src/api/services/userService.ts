import { Login, NewPassword, Token, User } from '../__generated__';
import axios from 'axios';

const endpoint = `${process.env.REACT_APP_API_URL}/Users`;
const token = localStorage.getItem('token');
const authorization = { Authorization: `Bearer ${token}` };

export function login(request: Login) {
  return axios.post<Token>(`${endpoint}/login`, request);
}

export function changePassword(request: NewPassword) {
  return axios.post<Token>(`${endpoint}/Password`, request, {
    headers: authorization,
  });
}

export function users() {
  return axios.get<User[]>(endpoint, { headers: authorization });
}
