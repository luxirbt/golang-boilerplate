import axios from 'axios';
import { AuthResponse } from '../types/models/auth/auth';

export const login = (username: string, password: string, appname: string): Promise<AuthResponse> => {
    return axios.post('/login/login', {
        username,
        password,
        appname,
    });
};
