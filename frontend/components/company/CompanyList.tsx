import React, { useState, useEffect, useContext } from 'react';
import { Pagination } from '../common/pagination';
import { PaginationContext } from '../../context/PaginationContext';
import useSearch from '../common/hook/SearchHook';
import useCompanyData from './CompanyDataHook';
import Company from '../../lib/types/models/company/company';
import { AppContext } from '../../context/AppContext';
import useDisplayForm from '../common/hook/DisplayFormHook';

export const CompanyList = () => {
    const { setIsFormUpdate, setIsFormCreate } = useContext(AppContext);

    const [companiesFiltered, setCompaniesFiltered] = useState<Company[]>([]);
    const { setItemOffset, setPageCount, itemsPerPage } = useContext(PaginationContext);
    const [companiesToshow, setCompaniesToShow] = useState<Company[]>([]);

    const { useFetchCompanies } = useCompanyData();

    const { data, isLoading, error } = useFetchCompanies();

    const { handleSearch } = useSearch();
    const { displayForm } = useDisplayForm();

    useEffect(() => {
        data && setCompaniesFiltered(data.slice(0, itemsPerPage));
    }, [data, itemsPerPage]);

    useEffect(() => {
        data && setCompaniesToShow(data);
    }, [data]);

    if (isLoading) {
        return <p>Is loading</p>;
    }

    if (error) {
        return <p>Error</p>;
    }

    return (
        <>
            <input
                placeholder="Rechercher"
                onChange={(e) =>
                    handleSearch(e, data as Company[], 'name', setPageCount, 10, setItemOffset, setCompaniesToShow)
                }
                type="search"
            />
            <table className="table">
                <thead>
                    <tr>
                        <th>Companies</th>
                    </tr>
                </thead>
                <tbody>
                    {companiesFiltered?.map((company: Company, index: number) => (
                        <tr key={index}>
                            <td>{company.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => displayForm(setIsFormCreate, setIsFormUpdate)}>+ Add Company</button>
            <Pagination items={companiesToshow} itemsPerPage={itemsPerPage} setItems={setCompaniesFiltered} />
        </>
    );
};
