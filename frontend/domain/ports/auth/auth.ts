import { AuthResponse } from '../../models/auth/auth';

export default interface AuthRepository {
    login(username: string, password: string, appname: string): Promise<AuthResponse>;
}
