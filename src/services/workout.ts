import axios, { AxiosResponse } from 'axios';
import { IService } from '.';
import { WorkoutProgram } from '../api/__generated__';

const endpoint = `${process.env.REACT_APP_API_URL}/WorkoutPrograms`;
const token = localStorage.getItem('token') || null;
const authorization = { Authorization: `Bearer ${token}` };

export type WorkoutProgramDTO = Omit<WorkoutProgram, 'workoutProgramId'>;

interface IWorkoutService
  extends IService<WorkoutProgram, string, WorkoutProgramDTO> {
  getByTrainer: () => Promise<AxiosResponse<WorkoutProgram[]>>;
  getByClientId: (id: string) => Promise<AxiosResponse<WorkoutProgram[]>>;
}

export const workoutService: IWorkoutService = {
  getByTrainer: async () =>
    await axios.get<WorkoutProgram[]>(endpoint, {
      headers: authorization,
    }),
  getByClientId: async (id) =>
    await axios.get<WorkoutProgram[]>(`${endpoint}/${id}`, {
      headers: authorization,
    }),
  getAll: async () =>
    await axios.get<WorkoutProgram[]>(`${endpoint}`, {
      headers: authorization,
    }),
  getSingle: async (id) =>
    await axios.get(`${endpoint}/${id}`, {
      headers: authorization,
    }),
  create: async (input) =>
    await axios.post<WorkoutProgram>(endpoint, input, {
      headers: authorization,
    }),
  update: async (input) =>
    await axios.put(`${endpoint}/${input.workoutProgramId}`, input, {
      headers: authorization,
    }),
  delete: async (id) =>
    await axios.delete(`${endpoint}/${id}`, {
      headers: authorization,
    }),
};
