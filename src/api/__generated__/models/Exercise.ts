/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Exercise = {
    /**
     * Primary key
     */
    exerciseId?: number;
    name?: string | null;
    description?: string | null;
    sets?: number | null;
    repetitions?: number | null;
    time?: string | null;
    /**
     * FK
     */
    workoutProgramId?: number | null;
    /**
     * FK to personal trainer
     */
    personalTrainerId?: number | null;
}