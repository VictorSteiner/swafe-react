import { AxiosResponse } from 'axios';
import { instance, IService } from '.';
import { NoUndefinedField, TypedOmit } from '../api/types';
import { WorkoutProgram } from '../api/__generated__';

const endpoint = `/WorkoutPrograms`;

export type WorkoutProgramDTO = NoUndefinedField<
  TypedOmit<WorkoutProgram, 'workoutProgramId'>
>;

interface IWorkoutService
  extends IService<WorkoutProgram, string, WorkoutProgramDTO> {
  getByTrainer: () => Promise<AxiosResponse<WorkoutProgram[]>>;
  getByClientId: (id: string) => Promise<AxiosResponse<WorkoutProgram[]>>;
}

export const workoutService: IWorkoutService = {
  getByTrainer: async () => await instance.get<WorkoutProgram[]>(endpoint),
  getByClientId: async (id) =>
    await instance.get<WorkoutProgram[]>(`${endpoint}/${id}`),
  getAll: async () => await instance.get<WorkoutProgram[]>(`${endpoint}`),
  getSingle: async (id) => await instance.get(`${endpoint}/${id}`),
  create: async (input) => await instance.post<WorkoutProgram>(endpoint, input),
  update: async (input) =>
    await instance.put(`${endpoint}/${input.workoutProgramId}`, input),
  delete: async (id) => await instance.delete(`${endpoint}/${id}`),
};
