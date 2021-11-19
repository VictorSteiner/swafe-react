/* eslint-disable no-shadow */
import { action, Action, thunk, Thunk, ThunkOn, thunkOn } from 'easy-peasy';
import jwtDecode from 'jwt-decode';
import { Login, NewPassword, Token, User } from '../api/__generated__';
import { UserDTO } from '../services/user';
import { Injections, Model, StoreModel } from './store';

export type DecodedToken = {
  Name: string;
  Role: string;
  UserId: string;
  nbf: string;
  exp: string;
};

type UserFilter = {
  name: string;
};

const defaultFilter: UserFilter = {
  name: '',
};

export interface UserModel extends Model<UserModel, User, UserDTO, UserFilter> {
  loggedInUser: User | undefined;
  token: Token | undefined;
  decodedToken: DecodedToken | undefined;
  newPassword: NewPassword | undefined;

  setLoggedInUser: Action<UserModel, User | undefined>;
  setToken: Action<UserModel, Token | undefined>;
  setDecodedToken: Action<UserModel, Token | undefined>;
  setNewPassword: Action<UserModel, NewPassword | undefined>;

  login: Thunk<UserModel, Login, Injections, StoreModel>;
  logout: Thunk<UserModel, void, Injections, StoreModel>;
  changePassword: Thunk<UserModel, NewPassword, Injections, StoreModel>;

  onLogin: ThunkOn<UserModel, Injections, StoreModel>;
}

export const user: UserModel = {
  // State
  isLoading: false,
  createInput: undefined,
  updateInput: undefined,
  filter: defaultFilter,
  loggedInUser: undefined,
  token: undefined,
  decodedToken: undefined,
  newPassword: undefined,

  // Update state
  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
  setCreateInput: action((state, payload) => {
    state.createInput = { ...state.createInput, ...payload };
  }),
  setUpdateInput: action((state, payload) => {
    state.updateInput = { ...state.updateInput, ...payload };
  }),
  setFilter: action((state, payload) => {
    state.filter = { ...state.filter, ...payload };
  }),
  setLoggedInUser: action((state, payload) => {
    state.loggedInUser = payload;
  }),
  setToken: action((state, payload) => {
    state.token = payload;
    console.log(payload?.jwt);
    if (payload?.jwt) {
      localStorage.setItem('token', payload.jwt);
    } else {
      localStorage.removeItem('token');
    }
  }),
  setDecodedToken: action((state, payload) => {
    state.decodedToken = payload?.jwt ? jwtDecode(payload.jwt) : undefined;
  }),
  setNewPassword: action((state, payload) => {
    state.newPassword = payload;
  }),

  // Service calls
  fetchAll: thunk(() => {
    throw 'Not implemented';
  }),
  fetchSingle: thunk(() => {
    throw 'Not implemented';
  }),
  create: thunk(
    async (action, payload, { injections: { userService: service } }) => {
      try {
        await service.create(payload);
        action.setCreateInput(undefined);
        // action.fetchAll();
      } catch (error) {
        throw error;
      }
    },
  ),
  update: thunk(
    async (action, payload, { injections: { userService: service } }) => {
      try {
        await service.update(payload);
        action.setUpdateInput(undefined);
        // action.fetchAll();
      } catch (error) {
        throw error;
      }
    },
  ),
  delete: thunk(
    async (_, payload, { injections: { userService: service } }) => {
      try {
        await service.delete(payload);
        // action.fetchAll();
      } catch (error) {
        throw error;
      }
    },
  ),
  changePassword: thunk(
    async (action, payload, { injections: { userService: service } }) => {
      try {
        var response = await service.changePassword(payload);
        action.setToken(response.data);
        action.setDecodedToken(response.data);
      } catch (error) {
        throw error;
      }
    },
  ),
  login: thunk(
    async (action, payload, { injections: { userService: service } }) => {
      try {
        var response = await service.login(payload);
        action.setToken(response.data);
        action.setDecodedToken(response.data);
      } catch (error) {}
    },
  ),
  logout: thunk((action) => {
    action.setToken(undefined);
    action.setDecodedToken(undefined);
  }),

  // Event listeners
  onSideEffect: thunkOn(
    (action) => [
      action.fetchAll.startType,
      action.fetchAll.failType,
      action.fetchAll.successType,
      action.fetchSingle.startType,
      action.fetchSingle.failType,
      action.fetchSingle.successType,
      action.create.startType,
      action.create.failType,
      action.create.successType,
      action.update.startType,
      action.update.failType,
      action.update.successType,
      action.delete.startType,
      action.delete.failType,
      action.delete.successType,
      action.login.startType,
      action.login.failType,
      action.login.successType,
    ],
    (actions, target) => {
      if (target.type.includes('start')) {
        actions.setIsLoading(true);
      } else {
        actions.setIsLoading(false);
      }
    },
  ),
  onLogin: thunkOn(
    (action) => [action.login.successType, action.changePassword.successType],
    async (
      actions,
      _,
      { injections: { userService: service }, getStoreState },
    ) => {
      const { user } = getStoreState();

      if (user.decodedToken?.UserId) {
        try {
          var response = await service.getSingle(user.decodedToken.UserId);
          actions.setLoggedInUser(response.data);
        } catch (error) {
          throw error;
        }
      }
    },
  ),
};
