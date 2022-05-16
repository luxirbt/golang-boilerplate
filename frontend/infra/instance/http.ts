/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from 'axios';

const axios = Axios.create({
    baseURL: '/server',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
});

type RequestWithData = (string: string, headers: any) => Promise<any>;
type AuthRequestWithoutData = (string: string, token: string) => Promise<any>;
type AuthRequestWithData = (string: string, token: string | undefined, mixed: any) => Promise<any>;

const wrapErrorExtractionWithoutData =
    (request: RequestWithData): any =>
    async (string: string, headers: any) => {
        try {
            return await request(string, headers);
        } catch (error) {
            throw error;
        }
    };

const wrapErrorExtractionWithData =
    (request: AuthRequestWithData): any =>
    async (string: string, data: any, token: string) => {
        try {
            return await request(string, data, token);
        } catch (error) {
            throw error;
        }
    };

export const doGet: AuthRequestWithoutData = (url, token) => get(url, withUserToken(token));

export const doPost: AuthRequestWithData = (url, token, data = {}) => post(url, data, withUserToken(token));

export const doDel: AuthRequestWithoutData = (url, token) => del(url, withUserToken(token));

export const doPut: AuthRequestWithData = (url, token, data = {}) => put(url, data, withUserToken(token));

export const doPatch: AuthRequestWithData = (url, token, data = {}) => patch(url, data, withUserToken(token));

export const post = wrapErrorExtractionWithData(axios.post);
export const get = wrapErrorExtractionWithoutData(axios.get);
const del = wrapErrorExtractionWithoutData(axios.delete);
const put = wrapErrorExtractionWithData(axios.put);
const patch = wrapErrorExtractionWithData(axios.patch);

const withUserToken = (token: string | undefined) => {
    if (!token) {
        return;
    }

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};
