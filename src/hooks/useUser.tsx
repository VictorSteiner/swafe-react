import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getUser } from '../api/services/userService';
import { User } from '../api/__generated__';
import { useToken } from './useToken';

const UserContext = createContext({
  user: {} as User | null,
  setUser: {} as Dispatch<SetStateAction<User | null>>,
});

export const UserContextProvider: React.FC = ({ children }) => {
  const { decoded } = useToken();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!decoded?.UserId) {
      setUser(null);
    } else {
      getUser(decoded.UserId).then((response) => setUser(response.data));
    }
  }, [decoded?.UserId]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
