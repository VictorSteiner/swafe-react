/* eslint-disable @typescript-eslint/ban-types */
import { Action, createStore, persist, Thunk, ThunkOn } from 'easy-peasy';
import { exerciseService } from '../services/exercise';
import { userService } from '../services/user';
import { workoutService } from '../services/workout';
import { exercise, ExerciseModel } from './exercise.store';
import { user, UserModel } from './user.store';
import { workout, WorkoutProgramModel } from './workoutProgram.store';

export interface IModel<TModel extends object, TEntity, TDTO, TFilter> {
  // State
  isLoading: boolean;
  createInput: Partial<TDTO> | undefined;
  updateInput: Partial<TEntity> | undefined;
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
  workoutService: typeof workoutService;
}

export const injections: Injections = {
  exerciseService,
  userService,
  workoutService,
};

export interface StoreModel {
  exercise: ExerciseModel;
  user: UserModel;
  workout: WorkoutProgramModel;
}

export const store = createStore<StoreModel>(
  persist({
    exercise,
    user,
    workout,
  }),
  { injections },
);
