/* eslint-disable @typescript-eslint/ban-types */
import { Action, createStore, Thunk, ThunkOn } from 'easy-peasy';
import { exerciseService } from '../services/exercise';
import { userService } from '../services/user';
import { exercise, ExerciseModel } from './exercise.store';
import { user, UserModel } from './user.store';

export interface Model<TModel extends object, TEntity, TDTO, TFilter> {
  // State
  isLoading: boolean;
  createInput: TDTO | undefined;
  updateInput: TEntity | undefined;
  filter: TFilter;

  // Action / Update state
  setIsLoading: Action<TModel, boolean>;
  setCreateInput: Action<TModel, Partial<TDTO> | undefined>;
  setUpdateInput: Action<TModel, Partial<TEntity> | undefined>;
  setFilter: Action<TModel, Partial<TFilter>>;

  // Service calls
  fetchAll: Thunk<TModel, void, Injections, StoreModel>;
  fetchSingle: Thunk<TModel, string, Injections, StoreModel>;
  create: Thunk<TModel, TDTO, Injections, StoreModel>;
  update: Thunk<TModel, TEntity, Injections, StoreModel>;
  delete: Thunk<TModel, string, Injections, StoreModel>;

  // Event listeners
  onSideEffect: ThunkOn<TModel, Injections, StoreModel>;
}

export interface Injections {
  exerciseService: typeof exerciseService;
  userService: typeof userService;
}

export const injections: Injections = {
  exerciseService,
  userService,
};

export interface StoreModel {
  exercise: ExerciseModel;
  user: UserModel;
}

export const store = createStore<StoreModel>(
  {
    exercise,
    user,
  },
  { injections },
);
