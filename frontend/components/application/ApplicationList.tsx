import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Pagination } from '../common/pagination';
import { PaginationContext } from '../../context/PaginationContext';
import useDisplayForm from '../common/hook/DisplayFormHook';
import useSearch from '../common/hook/SearchHook';
import useApplicationData from './ApplicationDataHook';
import Application from '../../lib/types/models/application/application';
import { useTranslation } from 'react-i18next';
import Sort from '../../public/images/sort.png';
import Image from 'next/image';
import useSort from '../common/hook/SortHook';
import { ApplicationContext } from '../../context/ApplicationContext';
import ApplicationDetail from './Application';

export const ApplicationList = () => {
    const { t } = useTranslation();
    const { itemsPerPage } = useContext(PaginationContext);
    const { setApplication, application: currentApplication } = useContext(ApplicationContext);

    const [applicationsFiltered, setApplicationsFiltered] = useState<Application[]>([]);
    const [applicationsToShow, setApplicationsToShow] = useState<Application[]>([]);

    const { useFetchApplications } = useApplicationData();
    const { data, isLoading } = useFetchApplications();

    const { displayForm } = useDisplayForm();
    const search = useSearch(data as Application[], 'appname', setApplicationsToShow);
    const { handleSort } = useSort(data as Application[], setApplicationsToShow);

    useEffect(() => {
        data && setApplicationsFiltered(data.slice(0, itemsPerPage));
    }, [data, itemsPerPage]);

    useEffect(() => {
        data && setApplicationsToShow(data);
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
                    {applicationsFiltered?.map((application: Application) => (
                        <ApplicationDetail
                            application={application}
                            setApplication={setApplication}
                            currentApplication={currentApplication}
                            key={application.id}
                        />
                    ))}
                </tbody>
            </table>
            <div className="d-flex align-items-center">
                <button className="btn btn-primary" onClick={() => displayForm(setApplication)}>
                    {t('applications.add.add_button')}
                </button>
                <Pagination items={applicationsToShow} itemsPerPage={itemsPerPage} setItems={setApplicationsFiltered} />
            </div>
        </>
    );
};
