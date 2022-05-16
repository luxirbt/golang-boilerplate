import { AuthResponse } from '../../domain/models/auth/auth';
import AuthRepository from '../../domain/ports/auth/auth';

export const login = async (
    authRepository: AuthRepository,
    username: string,
    password: string,
    appname: string,
): Promise<AuthResponse> => {
    try {
        return await authRepository.login(username, password, appname);
    } catch (error) {
        throw error;
    }
};
