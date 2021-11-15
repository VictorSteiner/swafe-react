import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import jwt_decode from 'jwt-decode';

type DecodedToken = {
  Name: string;
  Role: string;
  UserId: string;
  nbf: string;
  exp: string;
};

export interface TokenContext {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  isExpired: boolean;
  userId: number | null;
}

export const tokenContext = createContext<TokenContext>({
  token: null,
  setToken: () => {
    // Do nothing
  },
  isExpired: true,
  userId: null,
});

export const useToken = (): TokenContext => {
  // Update token manually
  const [token, setToken] = useState<string | null>(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiTWFuYWdlciIsIlJvbGUiOiJNYW5hZ2VyIiwiVXNlcklkIjoiMSIsIm5iZiI6IjE2MzY5ODM5NzYiLCJleHAiOiIxNjM3MDcwMzc2In0.83GNqI3W3JknIejhCKVH2G5vv2xMcx9c1lyH7RYBQE8',
  );
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (token) {
      const decoded: DecodedToken = jwt_decode(token);
      setUserId(Number.parseInt(decoded.UserId));
    }
  }, [token, setUserId]);

  console.log(token ? jwt_decode(token) : token);

  return { token, setToken, isExpired, userId };
};
