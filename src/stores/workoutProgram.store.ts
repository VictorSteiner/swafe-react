/* eslint-disable no-shadow */
import { action, Action, computed, Computed, thunk, thunkOn } from 'easy-peasy';
import { WorkoutProgram } from '../api/__generated__';
import { WorkoutProgramDTO } from '../services/workout';
import { IModel } from './store';

type WorkoutProgramFilter = {
  name: string;
};

const defaultFilter: WorkoutProgramFilter = {
  name: '',
};

export interface WorkoutProgramModel
  extends IModel<
    WorkoutProgramModel,
    WorkoutProgram,
    WorkoutProgramDTO,
    WorkoutProgramFilter
  > {
  workoutsPrograms: WorkoutProgram[];
  workoutProgramsQuery: Computed<WorkoutProgramModel, WorkoutProgram[]>;

  setWorkoutPrograms: Action<WorkoutProgramModel, WorkoutProgram[]>;
}

export const workout: WorkoutProgramModel = {
  // State
  isLoading: false,
  filter: defaultFilter,
  createInput: undefined,
  updateInput: undefined,
  workoutsPrograms: [],
  workoutProgramsQuery: computed((state) =>
    state.workoutsPrograms.filter((x) =>
      x.name?.toLowerCase().includes(state.filter.name.toLowerCase()),
    ),
  ),

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
  setWorkoutPrograms: action((state, payload) => {
    state.workoutsPrograms = payload;
  }),
  setFilter: action((state, payload) => {
    state.filter = { ...state.filter, ...payload };
  }),

  // Service calls
  fetchAll: thunk(
    async (actions, _, { injections: { workoutService: service } }) => {
      try {
        var response = await service.getAll();
        actions.setWorkoutPrograms(response.data);
      } catch (error) {
        throw error;
      }
    },
  ),
  fetchSingle: thunk((_) => {
    throw 'Not implemented';
  }),
  create: thunk(
    async (action, payload, { injections: { workoutService: service } }) => {
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
    async (action, payload, { injections: { workoutService: service } }) => {
      try {
        await service.update(payload);
        action.setUpdateInput(undefined);
        action.fetchAll();
      } catch (error) {
        throw error;
      }
    },
  ),
  delete: thunk(
    async (action, payload, { injections: { workoutService: service } }) => {
      try {
        await service.delete(payload);
        action.fetchAll();
      } catch (error) {
        throw error;
      }
    },
  ),

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
