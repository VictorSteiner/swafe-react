/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Exercise } from './Exercise';

export type WorkoutProgram = {
    workoutProgramId?: number;
    name?: string | null;
    description?: string | null;
    exercises?: Array<Exercise> | null;
    personalTrainerId?: number;
    clientId?: number | null;
}