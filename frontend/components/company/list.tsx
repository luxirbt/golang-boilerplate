import React, { useState, useEffect, useContext } from 'react';
import styles from '../../styles/position.module.scss';
import Account_manger_Logo from '../../assets/account_manager_logo_page.png';
import Image from 'next/image';
import { Pagination } from '../pagination';
import Create from './addCompany';
import { PaginationContext } from '../../context/PaginationContext';
import useSearch from '../common/hook/SearchHook';
import useCompanyData from './CompanyDataHook';
import Company from '../../lib/types/models/company/company';

export const List = () => {
    const [companiesFiltered, setCompaniesFiltered] = useState<Company[]>([]);
    const { setItemOffset, setPageCount, itemsPerPage } = useContext(PaginationContext);
    const [companystoshow, setCompanystoshow] = useState<Company[]>([]);

    const { useFetchCompanies } = useCompanyData();

    const { data, isLoading, error } = useFetchCompanies();

    const { handleSearch } = useSearch();

    useEffect(() => {
        data && setCompaniesFiltered(data.slice(0, itemsPerPage));
    }, [data, itemsPerPage]);

    useEffect(() => {
        data && setCompanystoshow(data);
    }, [data]);

    if (isLoading) {
        return <p>Is loading</p>;
    }

    if (error) {
        return <p>Error</p>;
    }

    return (
        <div>
            <div className={styles.Account_manger_Logo_Page}>
                <Image src={Account_manger_Logo} alt="logo" />
            </div>
            <h1 className={styles.Account_manager}>Account Manager</h1>

            <div className={styles.container_position}>
                <h1 className={styles.Title_Position}>Users</h1>
                <h3 className={styles.Title_PositionPage}>Add company</h3>
            </div>
            <div className="table-wrapper">
                {/* <Search /> */}
                <input
                    placeholder="Rechercher"
                    onChange={(e) =>
                        handleSearch(e, data as Company[], 'name', setPageCount, 10, setItemOffset, setCompanystoshow)
                    }
                    type="search"
                />
                <table className="fl-table">
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
                <Pagination items={companystoshow} itemsPerPage={itemsPerPage} setItems={setCompaniesFiltered} />

                <Create />
            </div>
        </div>
    );
};
