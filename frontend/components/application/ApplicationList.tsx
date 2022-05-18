import React from 'react';
import { useEffect, useState, ChangeEvent, useContext } from 'react';
import { Pagination } from '../common/pagination';
import { PaginationContext } from '../../context/PaginationContext';
import { AppContext } from '../../context/AppContext';
import useDisplayForm from '../common/hook/DisplayFormHook';
import useSearch from '../common/hook/SearchHook';
import useApplicationData from './ApplicationDataHook';
import Application from '../../lib/types/models/application/application';
import styles from '../../styles/button.module.scss';

export const ApplicationList = () => {
    const { setItemOffset, setPageCount, itemsPerPage } = useContext(PaginationContext);
    const { setIsFormUpdate, setIsFormCreate } = useContext(AppContext);

    const [applicationId, setApplicationId] = useState<number>(0);
    const [applicationsFiltered, setApplicationsFiltered] = useState<Application[]>([]);
    const [applicationsToShow, setApplicationsToShow] = useState<Application[]>([]);

    const { useFetchApplications } = useApplicationData();
    const { data, isLoading, error } = useFetchApplications();

    const { displayForm } = useDisplayForm();
    const { handleSearch } = useSearch();

    useEffect(() => {
        data && setApplicationsFiltered(data.slice(0, itemsPerPage));
    }, [data, itemsPerPage]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setApplicationId(parseInt(e.target.value));
        setIsFormUpdate(true);
        setIsFormCreate(false);
    };

    useEffect(() => {
        data && setApplicationsToShow(data);
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
                    handleSearch(
                        e,
                        data as Application[],
                        'appname',
                        setPageCount,
                        10,
                        setItemOffset,
                        setApplicationsToShow,
                    )
                }
                type="search"
            />
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Application name</th>
                        <th>Url </th>
                        <th>Display name</th>
                        <th>Web app</th>
                    </tr>
                </thead>

                <tbody>
                    {applicationsFiltered?.map((application: Application, index: number) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="radio"
                                    value={application.id}
                                    name="check"
                                    onChange={handleChange}
                                    checked={application.id === applicationId}
                                />
                            </td>
                            <td>{application.appname}</td>
                            <td>{application.url}</td>
                            <td>{application.displayname}</td>
                            <td>{application.webapp == true ? 'Its a web App' : 'Its not a Web App'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex align-items-center">
                <button
                    className={styles.button}
                    onClick={() => displayForm(setIsFormCreate, setIsFormUpdate, setApplicationId)}
                >
                    Add application
                </button>
                <Pagination items={applicationsToShow} itemsPerPage={itemsPerPage} setItems={setApplicationsFiltered} />
            </div>
        </>
    );
};
