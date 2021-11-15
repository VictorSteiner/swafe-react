/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WorkoutProgram } from '../models/WorkoutProgram';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class WorkoutProgramsService {

    /**
     * @returns WorkoutProgram Success
     * @throws ApiError
     */
    public static getWorkoutPrograms(): CancelablePromise<Array<WorkoutProgram>> {
        return __request({
            method: 'GET',
            path: `/api/WorkoutPrograms/trainer`,
        });
    }

    /**
     * @param id 
     * @returns WorkoutProgram Success
     * @throws ApiError
     */
    public static getWorkoutPrograms1(
id: number,
): CancelablePromise<Array<WorkoutProgram>> {
        return __request({
            method: 'GET',
            path: `/api/WorkoutPrograms/client/${id}`,
        });
    }

    /**
     * @returns WorkoutProgram Success
     * @throws ApiError
     */
    public static getWorkoutPrograms2(): CancelablePromise<Array<WorkoutProgram>> {
        return __request({
            method: 'GET',
            path: `/api/WorkoutPrograms`,
        });
    }

    /**
     * @param requestBody 
     * @returns WorkoutProgram Success
     * @throws ApiError
     */
    public static postWorkoutPrograms(
requestBody?: WorkoutProgram,
): CancelablePromise<WorkoutProgram> {
        return __request({
            method: 'POST',
            path: `/api/WorkoutPrograms`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns WorkoutProgram Success
     * @throws ApiError
     */
    public static getWorkoutPrograms3(
id: number,
): CancelablePromise<WorkoutProgram> {
        return __request({
            method: 'GET',
            path: `/api/WorkoutPrograms/${id}`,
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static putWorkoutPrograms(
id: number,
requestBody?: WorkoutProgram,
): CancelablePromise<any> {
        return __request({
            method: 'PUT',
            path: `/api/WorkoutPrograms/${id}`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public static deleteWorkoutPrograms(
id: number,
): CancelablePromise<any> {
        return __request({
            method: 'DELETE',
            path: `/api/WorkoutPrograms/${id}`,
        });
    }

}