/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Exercise } from '../models/Exercise';
import type { ExerciseDto } from '../models/ExerciseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class ExercisesService {
  /**
   * Use this endpoint to add an exercise to an existing workout program.
   * @param programId programId for the program the exercise is added to.
   * @param requestBody exercise
   * @returns Exercise Success
   * @throws ApiError
   */
  public static postExercises(
    programId: number,
    requestBody?: ExerciseDto,
  ): CancelablePromise<Exercise> {
    return __request({
      method: 'POST',
      path: `/api/Exercises/Program/${programId}`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Gets all exercises a trainer has in the system.
   * @returns Exercise Success
   * @throws ApiError
   */
  public static getExercises(): CancelablePromise<Array<Exercise>> {
    return __request({
      method: 'GET',
      path: `/api/Exercises`,
    });
  }

  /**
   * @param requestBody
   * @returns Exercise Success
   * @throws ApiError
   */
  public static postExercises1(
    requestBody?: Exercise,
  ): CancelablePromise<Exercise> {
    return __request({
      method: 'POST',
      path: `/api/Exercises`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @param id
   * @returns Exercise Success
   * @throws ApiError
   */
  public static getExercises1(id: number): CancelablePromise<Exercise> {
    return __request({
      method: 'GET',
      path: `/api/Exercises/${id}`,
    });
  }

  /**
   * @param id
   * @param requestBody
   * @returns any Success
   * @throws ApiError
   */
  public static putExercises(
    id: number,
    requestBody?: Exercise,
  ): CancelablePromise<any> {
    return __request({
      method: 'PUT',
      path: `/api/Exercises/${id}`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @param id
   * @returns any Success
   * @throws ApiError
   */
  public static deleteExercises(id: number): CancelablePromise<any> {
    return __request({
      method: 'DELETE',
      path: `/api/Exercises/${id}`,
    });
  }
}
