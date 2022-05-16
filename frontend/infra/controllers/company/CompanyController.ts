import Company from '../../../domain/models/company/company';
import { addCompany, getAll } from '../../../app/company/company';
import ApiCompanyRepository from '../../repositories/company/ApiCompanyRepository';

const api = new ApiCompanyRepository();

export default class CompanyController {
    static async getAll(): Promise<Company[]> {
        return getAll(api);
    }

    static async addCompany(name: string): Promise<Company> {
        return addCompany(api, name);
    }
}
