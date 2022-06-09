import React, { useState, useEffect, useContext } from 'react';
import { Pagination } from '../common/pagination';
import { PaginationContext } from '../../context/PaginationContext';
import useSearch from '../common/hook/SearchHook';
import useCompanyData from './CompanyDataHook';
import Company from '../../lib/types/models/company/company';
import useDisplayForm from '../common/hook/DisplayFormHook';
import { useTranslation } from 'react-i18next';
import Sort from '../../public/images/sort.png';
import Image from 'next/image';
import useSort from '../common/hook/SortHook';

export const CompanyList = () => {
    const { t } = useTranslation();

    const [companiesFiltered, setCompaniesFiltered] = useState<Company[]>([]);
    const { itemsPerPage } = useContext(PaginationContext);
    const [companiesToshow, setCompaniesToShow] = useState<Company[]>([]);

    const { useFetchCompanies } = useCompanyData();

    const { data, isLoading } = useFetchCompanies();

    const search = useSearch(data as Company[], 'name', setCompaniesToShow);

    const { displayForm } = useDisplayForm();
    const { handleSort } = useSort(data as Company[], setCompaniesToShow);

    useEffect(() => {
        data && setCompaniesFiltered(data.slice(0, itemsPerPage));
    }, [data, itemsPerPage]);

    useEffect(() => {
        data && setCompaniesToShow(data);
    }, [data]);

    if (isLoading) {
        return <p>{t('common.loading')}</p>;
    }

    return (
        <>
            {search}
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            {t('company.list.name')}
                            <Image src={Sort} alt="img-sort" onClick={handleSort} id="name" width={20} height={20} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {companiesFiltered?.map((company: Company) => (
                        <tr key={company.id}>
                            <td>{company.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex align-items-center">
                <button className="btn btn-primary" onClick={() => displayForm()}>
                    {t('company.add.add_button')}
                </button>
                <Pagination items={companiesToshow} itemsPerPage={itemsPerPage} setItems={setCompaniesFiltered} />
            </div>
        </>
    );
};
