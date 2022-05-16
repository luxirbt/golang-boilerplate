import Company from '../../domain/models/company/company';
import CompanyRepository from '../../domain/ports/company/company';

export async function getAll(companyRepository: CompanyRepository): Promise<Company[]> {
    return await companyRepository.getAll();
}

export async function addCompany(companyRepository: CompanyRepository, name: string): Promise<Company> {
    return await companyRepository.save(name);
}
