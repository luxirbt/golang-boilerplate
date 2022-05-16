import React, { useState, useEffect, useCallback, useContext } from 'react';
import Company from '../../domain/models/company/company';
import styles from '../../styles/position.module.scss';
import Account_manger_Logo from '../../assets/account_manager_logo_page.png';
import Image from 'next/image';
import { Pagination } from '../pagination';
import { Create } from './addCompany';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchAll } from '../../store/action/companyAction';
import { PaginationContext } from '../../context/PaginationContext';
import useSearch from '../common/hook/SearchHook';

export const List = () => {
    const [companiesFiltered, setCompaniesFiltered] = useState<Company[]>([]);
    const { setItemOffset, setPageCount, itemsPerPage } = useContext(PaginationContext);
    const [companystoshow, setCompanystoshow] = useState<Company[]>([]);

    const dispatch = useAppDispatch();
    const companies = useAppSelector((state) => state.companies.entities);
    const { handleSearch } = useSearch();

    const getCompaniesList = useCallback(async () => {
        dispatch(fetchAll());
    }, [dispatch]);

    useEffect(() => {
        getCompaniesList();
    }, [getCompaniesList]);

    useEffect(() => {
        setCompaniesFiltered(companies.slice(0, itemsPerPage));
    }, [companies, itemsPerPage]);

    useEffect(() => {
        setCompanystoshow(companies);
    }, [companies]);

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
                        handleSearch(e, companies, 'name', setPageCount, 10, setItemOffset, setCompanystoshow)
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
