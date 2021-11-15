import { Login, NewPassword, Token, User } from '../__generated__';
import axios from 'axios';

const endpoint = `${process.env.REACT_APP_API_URL}/Users`;
const token = localStorage.getItem('token') || null;
const authorization = { Authorization: `Bearer ${token}` };

export function login(request: Login) {
  return axios.post<Token>(`${endpoint}/login`, request).then((response) => {
    const jwtToken = response.data.jwt ?? null;

    if (jwtToken) {
      var x = window.open('', 'externalLogin', '');
      x?.localStorage.setItem('token', jwtToken);
      x?.close();
    }
  });
}

export function logout() {
  var x = window.open('', 'externalLogout', '');
  x?.localStorage.clear();
  x?.close();
}

export function changePassword(request: NewPassword) {
  return axios.post<Token>(`${endpoint}/Password`, request, {
    headers: authorization,
  });
}

export function users() {
  return axios.get<User[]>(endpoint, { headers: authorization });
}

export function currentUser() {
  const userId = localStorage.getItem('userId');
  return axios.get<User>(`${endpoint}/${userId ?? '1'}`, {
    headers: authorization,
  });
}
