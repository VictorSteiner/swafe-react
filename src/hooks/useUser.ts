import { createContext, Dispatch, SetStateAction, useState } from 'react';
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

  return { user, setUser };
};
