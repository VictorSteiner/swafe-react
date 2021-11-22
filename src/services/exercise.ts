import { instance, IService } from '.';
import { NoUndefinedField, TypedOmit } from '../api/types';
import { Exercise } from '../api/__generated__';
import { AxiosResponse } from 'axios';

const endpoint = `/Exercises`;

export type ExerciseDTO = NoUndefinedField<Omit<Exercise, 'exerciseId'>>;

interface IExerciseService extends IService<Exercise, string, ExerciseDTO> {
  addToProgram: (
    id: string,
    input: TypedOmit<
      Exercise,
      'exerciseId' | 'workoutProgramId' | 'personalTrainerId'
    >,
  ) => Promise<AxiosResponse<Exercise>>;
}

export const exerciseService: IExerciseService = {
  getAll: async () => await instance.get<Exercise[]>(endpoint),
  getSingle: async (id) => await instance.get<Exercise>(`${endpoint}/${id}`),
  create: async (input) => await instance.post<Exercise>(endpoint, input),
  update: async (input) =>
    await instance.put(`${endpoint}/${input.exerciseId}`, input),
  delete: async (id) => instance.delete(`${endpoint}/${id}`),
  addToProgram: async (id, input) =>
    await instance.post(`${endpoint}/Program/${id}`, input),
};
