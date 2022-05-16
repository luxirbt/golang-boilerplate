import { login } from '../../../app/auth/auth';
import { AuthResponse } from '../../../domain/models/auth/auth';
import ApiAuthRepository from '../../repositories/auth/AuthRepository';

const api = new ApiAuthRepository();

export default class AuthController {
    static async Login(username: string, password: string, appname: string): Promise<AuthResponse> {
        return login(api, username, password, appname);
    }
}
