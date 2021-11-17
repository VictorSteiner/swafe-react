import jwtDecode from 'jwt-decode';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
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

const TokenContext = createContext({
  token: {} as string | null,
  setToken: {} as Dispatch<SetStateAction<string | null>>,
  decoded: {} as DecodedToken | null,
});

export const TokenContextProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token') ?? null,
  );
  const [decoded, setDecoded] = useState<DecodedToken | null>(null);

  useEffect(() => {
    setDecoded(token ? (jwtDecode(token) as DecodedToken) : null);
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken, decoded }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
