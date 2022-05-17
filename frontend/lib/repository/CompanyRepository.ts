import axios from 'axios';
import Company from '../types/models/company/company';

const getAll = async (): Promise<Company[]> => {
    const { data } = await axios.get('api/company');
    return data;
};

const save = (name: string) => {
    return axios.post('api/company', { name });
};

export const companyRepository = {
    getAll,
    save,
};
