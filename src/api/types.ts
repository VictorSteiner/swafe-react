export type AccountType = 'Manager' | 'Client' | 'PersonalTrainer';

export type TypedOmit<T, K extends keyof T> = Omit<T, K>;
export type NonNullable<T> = Exclude<T, null | undefined>;
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};
