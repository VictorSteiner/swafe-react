/* eslint-disable no-shadow */
import {
  action,
  Action,
  computed,
  Computed,
  thunk,
  Thunk,
  thunkOn,
} from 'easy-peasy';
import { TypedOmit } from '../api/types';
import { Exercise } from '../api/__generated__';
import { ExerciseDTO } from '../services/exercise';
import { Injections, IModel, StoreModel } from './store';

type ExerciseFilter = {
  name: string;
};

const defaultFilter: ExerciseFilter = {
  name: '',
};

type AddToProgramPayload = {
  id: string;
  input: TypedOmit<
    Exercise,
    'exerciseId' | 'workoutProgramId' | 'personalTrainerId'
  >;
};

export interface ExerciseModel
  extends IModel<ExerciseModel, Exercise, ExerciseDTO, ExerciseFilter> {
  exercises: Exercise[];
  searchExercises: Computed<ExerciseModel, Exercise[], StoreModel>;

  setExercises: Action<ExerciseModel, Exercise[]>;

  setIsLoading: Action<ExerciseModel, boolean>;

  fetchSingle: Thunk<ExerciseModel, string, Injections, StoreModel>;
  addToProgram: Thunk<
    ExerciseModel,
    AddToProgramPayload,
    Injections,
    StoreModel
  >;
}

export const exercise: ExerciseModel = {
  // State
  isLoading: false,
  createInput: undefined,
  updateInput: undefined,
  exercises: [],
  filter: defaultFilter,
  searchExercises: computed((state) => {
    return state.exercises.filter(
      (x) =>
        x.name?.toLowerCase().includes(state.filter.name.toLowerCase()) &&
        !x.workoutProgramId,
    );
  }),

  // Action
  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
  setCreateInput: action((state, payload) => {
    state.createInput = { ...state.createInput, ...payload };
  }),
  setUpdateInput: action((state, payload) => {
    state.updateInput = { ...state.updateInput, ...payload };
  }),
  setExercises: action((state, payload) => {
    state.exercises = payload;
  }),
  setFilter: action((state, payload) => {
    state.filter = { ...state.filter, ...payload };
  }),

  // Service calls
  fetchAll: thunk(
    async (actions, _, { injections: { exerciseService: service } }) => {
      try {
        var response = await service.getAll();
        actions.setExercises(response.data);
      } catch (error) {
        throw error;
      }
    },
  ),
  fetchSingle: thunk((_) => {
    throw 'Not implemented';
  }),
  create: thunk(
    async (action, payload, { injections: { exerciseService: service } }) => {
      try {
        await service.create(payload);
        action.setCreateInput(undefined);
        action.fetchAll();
      } catch (error) {
        throw error;
      }
    },
  ),
  update: thunk(
    async (
      action,
      payload,
      { injections: { exerciseService: service }, getStoreActions },
    ) => {
      try {
        const {
          workout: { fetchAll },
        } = getStoreActions();
        await service.update(payload);
        action.setUpdateInput(undefined);
        action.fetchAll();
        fetchAll();
      } catch (error) {
        throw error;
      }
    },
  ),
  delete: thunk(
    async (
      action,
      payload,
      { injections: { exerciseService: service }, getStoreActions },
    ) => {
      try {
        const { workout } = getStoreActions();
        await service.delete(payload);
        action.fetchAll();
        workout.fetchAll();
      } catch (error) {
        throw error;
      }
    },
  ),
  addToProgram: thunk(
    async (
      action,
      payload,
      { injections: { exerciseService: service }, getStoreActions },
    ) => {
      try {
        const { workout } = getStoreActions();
        await service.addToProgram(payload.id, payload.input);
        action.fetchAll();
        workout.fetchAll();
      } catch (error) {
        throw error;
      }
    },
  ),

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
    ],
    (actions, target) => {
      if (target.type.includes('start')) {
        actions.setIsLoading(true);
      } else {
        actions.setIsLoading(false);
      }
    },
  ),
};
