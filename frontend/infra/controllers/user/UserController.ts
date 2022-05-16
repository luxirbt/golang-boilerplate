import User from '../../../domain/models/user/user';
import {
    addUser,
    getUsersList,
    updatePassword,
    sendEmail,
    invalidUrl,
    updateUser,
    getUser,
} from '../../../app/user/user';
import ApiUserRepository from '../../repositories/user/ApiUserRepository';
import AddUserDTO from '../../../domain/dto/user/addUserDTO';
import UpdateUserDTO from '../../../domain/dto/user/updateUserDTO';

const api = new ApiUserRepository();

export default class UserController {
    static async getAllUsers(): Promise<User[]> {
        return getUsersList(api);
    }

    static async addUser(data: AddUserDTO): Promise<void> {
        return addUser(api, data);
    }

    static async updatePassword(id: number, password: string): Promise<void> {
        updatePassword(api, id, password);
    }

    static async sendEmail(id: number, email: string): Promise<void> {
        sendEmail(api, id, email);
    }

    static async invalidUrl(): Promise<void> {
        invalidUrl(api);
    }

    static async updateUser(ID: number, data: UpdateUserDTO): Promise<void> {
        return updateUser(api, ID, data);
    }

    static async getUser(id: number): Promise<User> {
        return getUser(api, id);
    }
}
