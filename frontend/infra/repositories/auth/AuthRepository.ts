import axios from 'axios';
import { AuthResponse } from '../../../domain/models/auth/auth';
import AuthRepository from '../../../domain/ports/auth/auth';

export default class ApiAuthRepository implements AuthRepository {
    async login(username: string, password: string, appname: string): Promise<AuthResponse> {
        return await axios.post('/login/login', {
            username,
            password,
            appname,
        });
    }
}
