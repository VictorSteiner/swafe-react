import { instance, IService } from '.';
import { NoUndefinedField } from '../api/types';
import { Exercise } from '../api/__generated__';

const endpoint = `/Exercises`;

export type ExerciseDTO = NoUndefinedField<Omit<Exercise, 'exerciseId'>>;

interface IExerciseService extends IService<Exercise, string, ExerciseDTO> {}

export const exerciseService: IExerciseService = {
  getAll: async () => await instance.get<Exercise[]>(endpoint),
  getSingle: async (id) => await instance.get<Exercise>(`${endpoint}/${id}`),
  create: async (input) => await instance.post<Exercise>(endpoint, input),
  update: async (input) =>
    await instance.put(`${endpoint}/${input.exerciseId}`, input),
  delete: async (id) => instance.delete(`${endpoint}/${id}`),
};
