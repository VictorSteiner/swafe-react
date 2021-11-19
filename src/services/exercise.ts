import axios from 'axios';
import { IService } from '.';
import { Exercise } from '../api/__generated__';

const endpoint = `${process.env.REACT_APP_API_URL}/Exercises`;
const token = localStorage.getItem('token') || null;
const authorization = { Authorization: `Bearer ${token}` };

export type ExerciseDTO = Omit<Exercise, 'exerciseId'>;

interface IExerciseService extends IService<Exercise, string, ExerciseDTO> {}

export const exerciseService: IExerciseService = {
  getAll: async () =>
    await axios.get<Exercise[]>(endpoint, { headers: authorization }),
  getSingle: async (id) =>
    await axios.get<Exercise>(`${endpoint}/${id}`, { headers: authorization }),
  create: async (input) =>
    await axios.post<Exercise>(endpoint, input, { headers: authorization }),
  update: async (input) =>
    await axios.put(`${endpoint}/${input.exerciseId}`, input, {
      headers: authorization,
    }),
  delete: async (id) =>
    axios.delete(`${endpoint}/${id}`, { headers: authorization }),
};
