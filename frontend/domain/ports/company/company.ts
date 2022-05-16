import Company from '../../models/company/company';

export default interface CompanyRepository {
    getAll(): Promise<Company[]>;
    save(name: string): Promise<Company>;
}
