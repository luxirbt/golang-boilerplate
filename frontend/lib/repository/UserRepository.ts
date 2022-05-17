import axios from 'axios';
import AddUserDTO from '../types/dto/user/addUserDTO';
import UpdateUserDTO from '../types/dto/user/updateUserDTO';
import User from '../types/models/user/user';

const get = async (id: number): Promise<User> => {
    const { data } = await axios.get(`api/user/${id}`);
    return data;
};

const getAll = async (): Promise<User[]> => {
    const { data } = await axios.get('api/user');
    return data;
};

const save = (data: AddUserDTO) => {
    return axios.post('api/user', {
        firstname: data.firstname,
        username: data.username,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        is_active: data.is_active,
        id_company: data.id_company,
    });
};

const updatePassword = (id: number, password: string) => {
    return axios.patch(`api/user/password/${id}`, { ID: id, password });
};

const sendEmail = (id: number, email: string) => {
    return axios.post(`api/mail/${id}`, { email });
};

const invalidUrl = () => {
    return axios.post('api/invalidUrl');
};

const updateUser = (id: number, data: UpdateUserDTO) => {
    return axios.patch(`api/user/${id}`, {
        firstname: data.firstname,
        username: data.username,
        lastname: data.lastname,
        email: data.email,
        id_company: data.id_company,
    });
};

export const userRepository = {
    get,
    getAll,
    save,
    updatePassword,
    sendEmail,
    invalidUrl,
    updateUser,
};
