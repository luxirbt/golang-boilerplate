import axios from 'axios';
import AddUserDTO from '../../../domain/dto/user/addUserDTO';
import UpdateUserDTO from '../../../domain/dto/user/updateUserDTO';
import User from '../../../domain/models/user/user';
import UserRepository from '../../../domain/ports/user/user';

export default class ApiUserRepository implements UserRepository {
    async get(id: number): Promise<User> {
        const { data } = await axios.get(`api/user/${id}`);
        return data;
    }

    async getAll(): Promise<User[]> {
        const { data } = await axios.get('api/user');
        return data;
    }

    async save(data: AddUserDTO): Promise<void> {
        await axios.post('api/user', {
            firstname: data.firstname,
            username: data.username,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            is_active: data.is_active,
            id_company: data.id_company,
        });
    }

    async updatePassword(id: number, password: string): Promise<void> {
        await axios.patch(`api/user/password/${id}`, { ID: id, password });
    }

    async sendEmail(id: number, email: string): Promise<void> {
        await axios.post(`api/mail/${id}`, { email });
    }
    async invalidUrl(): Promise<void> {
        await axios.post('api/invalidUrl');
    }

    async updateUser(id: number, data: UpdateUserDTO): Promise<void> {
        const res = await axios.patch(`api/user/${id}`, {
            ID: id,
            firstname: data.firstname,
            username: data.username,
            lastname: data.lastname,
            email: data.email,
            id_company: data.id_company,
        });

        return res.data;
    }
}
