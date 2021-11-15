import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { Token } from '../api/__generated__';

export type DecodedToken = {
  Name: string;
  Role: string;
  UserId: string;
  nbf: string;
  exp: string;
};

export interface TokenContext {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}

export const tokenContext = createContext<TokenContext>({
  token: null,
  setToken: () => {
    // Do nothing
  },
});

export const useToken = (): TokenContext => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token') as string,
  );

  return { token, setToken };
};
