import axios from 'axios';
import Company from '../../../domain/models/company/company';
import CompanyRepository from '../../../domain/ports/company/company';

export default class ApiCompanyRepository implements CompanyRepository {
    async getAll(): Promise<Company[]> {
        const { data } = await axios.get('api/company');
        return data;
    }

    async save(name: string): Promise<Company> {
        const { data } = await axios.post('api/company', { name });
        return data;
    }
}
