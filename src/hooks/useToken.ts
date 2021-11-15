import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

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
  const [token, setToken] = useState<string | null>(null);

  const handleEvent = useCallback(() => {
    const storedToken = localStorage.getItem('token') || null;
    setToken(storedToken);
  }, [setToken]);

  useEffect(() => {
    window.addEventListener('storage', handleEvent);

    return () => {
      window.removeEventListener('storage', handleEvent);
    };
  }, [handleEvent]);

  return { token, setToken };
};
