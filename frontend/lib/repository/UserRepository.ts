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
        is_active: false,
        id_company: data.id_company,
    });
};

const updatePassword = (id: number, password: string) => {
    return axios.patch(`api/user/password/${id}`, { password });
};

const sendEmail = (id: number) => {
    return axios.post(`api/user/mail/${id}`);
};

const requestForNewPassword = async (id: number) => {
    const { data } = await axios.get(`api/user/reset-password/${id}`);
    return data;
};

const updateUser = (id: number, data: UpdateUserDTO) => {
    return axios.patch(`api/user/${id}`, {
        firstname: data.firstname,
        username: data.username,
        lastname: data.lastname,
        email: data.email,
        id_company: data.id_company,
        is_active: data.is_active,
    });
};

const deleteResetPasswordToken = (id: number) => {
    return axios.delete(`api/user/reset-password/${id}`);
};

export const userRepository = {
    get,
    getAll,
    save,
    updatePassword,
    sendEmail,
    updateUser,
    requestForNewPassword,
    deleteResetPasswordToken,
};
