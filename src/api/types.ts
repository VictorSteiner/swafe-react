import { User } from './__generated__';

export type AccountType = 'Manager' | 'Client' | 'PersonalTrainer';

export interface UserCreateDTO extends Omit<User, 'userId' | 'accountType'> {
  accountType: AccountType;
}
