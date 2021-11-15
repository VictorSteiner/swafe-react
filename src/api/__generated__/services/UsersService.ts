/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Login } from '../models/Login';
import type { NewPassword } from '../models/NewPassword';
import type { Token } from '../models/Token';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * You must login before you can use any other api call.
     * @param requestBody 
     * @returns Token Success
     * @throws ApiError
     */
    public static postUsers(
requestBody?: Login,
): CancelablePromise<Token> {
        return __request({
            method: 'POST',
            path: `/api/Users/login`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Use to change the password.
     * @param requestBody 
     * @returns Token Success
     * @throws ApiError
     */
    public static putUsers(
requestBody?: NewPassword,
): CancelablePromise<Token> {
        return __request({
            method: 'PUT',
            path: `/api/Users/Password`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get a let of all users
     * @returns User Success
     * @throws ApiError
     */
    public static getUsers(): CancelablePromise<Array<User>> {
        return __request({
            method: 'GET',
            path: `/api/Users`,
        });
    }

    /**
     * Valid accountTypes are: Client and PersonalTrainer".
 * The userId is set by the backend.
 * The personalTrainerId is only used for clients.
 * Valid accountTypes are PersonalTrainer and Client.
     * @param requestBody 
     * @returns User Success
     * @throws ApiError
     */
    public static postUsers1(
requestBody?: User,
): CancelablePromise<User> {
        return __request({
            method: 'POST',
            path: `/api/Users`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Gets the list of clients for a personal trainer.
     * @returns User Success
     * @throws ApiError
     */
    public static getUsers1(): CancelablePromise<Array<User>> {
        return __request({
            method: 'GET',
            path: `/api/Users/Clients`,
        });
    }

    /**
     * Returns the personal trainer for the logged in user.
     * @returns User Success
     * @throws ApiError
     */
    public static getUsers2(): CancelablePromise<User> {
        return __request({
            method: 'GET',
            path: `/api/Users/Trainer`,
        });
    }

    /**
     * @param id 
     * @returns User Success
     * @throws ApiError
     */
    public static getUsers3(
id: number,
): CancelablePromise<User> {
        return __request({
            method: 'GET',
            path: `/api/Users/${id}`,
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static putUsers1(
id: number,
requestBody?: User,
): CancelablePromise<any> {
        return __request({
            method: 'PUT',
            path: `/api/Users/${id}`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public static deleteUsers(
id: number,
): CancelablePromise<any> {
        return __request({
            method: 'DELETE',
            path: `/api/Users/${id}`,
        });
    }

}