import { createTypedHooks, StoreProvider as Provider } from 'easy-peasy';
import { store, StoreModel } from '../stores/store';

export const { useStoreActions, useStoreDispatch, useStoreState } =
  createTypedHooks<StoreModel>();

export const StoreProvider: React.FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
