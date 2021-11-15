import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { currentUser } from '../api/services/userService';
import { User } from '../api/__generated__';

export interface UserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const userContext = createContext<UserContext>({
  user: null,
  setUser: () => {
    // Do nothing
  },
});

export const useUser = (): UserContext => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user) {
      currentUser().then((value) => setUser(value.data));
    }
  });

  return { user, setUser };
};
