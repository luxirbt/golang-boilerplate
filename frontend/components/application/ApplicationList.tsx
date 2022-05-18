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
import { useTranslation } from 'react-i18next';
import Sort from '../../public/images/sort.png';
import Image from 'next/image';
import useSort from '../common/hook/SortHook';

export const ApplicationList = () => {
    const { t } = useTranslation();
    const { setItemOffset, setPageCount, itemsPerPage } = useContext(PaginationContext);
    const { setIsFormUpdate, setIsFormCreate } = useContext(AppContext);

    const [applicationId, setApplicationId] = useState<number>(0);
    const [applicationsFiltered, setApplicationsFiltered] = useState<Application[]>([]);
    const [applicationsToShow, setApplicationsToShow] = useState<Application[]>([]);

    const { useFetchApplications } = useApplicationData();
    const { data, isLoading } = useFetchApplications();

    const { displayForm } = useDisplayForm();
    const { handleSearch } = useSearch();
    const { handleSort } = useSort(data as Application[], setApplicationsToShow);

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
        return <p>{t('common.loading')}</p>;
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
                        <th>
                            {t('applications.list.appname')}
                            <Image src={Sort} alt="img-sort" onClick={handleSort} id="appname" width={20} height={20} />
                        </th>
                        <th>{t('applications.list.url')}</th>
                        <th>
                            {t('applications.list.display_name')}
                            <Image
                                src={Sort}
                                alt="img-sort"
                                onClick={handleSort}
                                id="displayname"
                                width={20}
                                height={20}
                            />
                        </th>
                        <th>{t('applications.list.web_app')}</th>
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
                    {t('applications.add.add_button')}
                </button>
                <Pagination items={applicationsToShow} itemsPerPage={itemsPerPage} setItems={setApplicationsFiltered} />
            </div>
        </>
    );
};
