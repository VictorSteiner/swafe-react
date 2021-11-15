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
  token: Token | null;
  setToken: Dispatch<SetStateAction<Token | null>>;
}

export const tokenContext = createContext<TokenContext>({
  token: null,
  setToken: () => {
    // Do nothing
  },
});

export const useToken = (): TokenContext => {
  const [token, setToken] = useState<Token | null>(null);

  return { token, setToken };
};
