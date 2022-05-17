import React from 'react';
import { useEffect, useState, ChangeEvent, useContext } from 'react';
import { Create } from '../../components/application/addApplication';
import { Banner } from '../banner';
import styles from '../../styles/position.module.scss';
import Account_manger_Logo from '../../assets/account_manager_logo_page.png';
import Image from 'next/image';
import { Pagination } from '../pagination';
import { PaginationContext } from '../../context/PaginationContext';
import { AppContext } from '../../context/AppContext';
import useDisplayForm from '../common/hook/DisplayFormHook';
import useSearch from '../common/hook/SearchHook';
import useApplicationData from './ApplicationDataHook';
import Application from '../../lib/types/models/application/application';

export const List = () => {
    const { setItemOffset, setPageCount, itemsPerPage } = useContext(PaginationContext);
    const { setIsFormUpdate, setIsFormCreate, formCreate } = useContext(AppContext);

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
        <div>
            <div>
                <div className={styles.Account_manger_Logo_Page}>
                    <Image src={Account_manger_Logo} alt="logo" />
                </div>
                <h1 className={styles.Account_manager}>Account Manager</h1>
            </div>

            <div className={styles.container_position}>
                <h1 className={styles.Title_Position}>Applications</h1>
                <h3 className={styles.Title_PositionPage}>Manage Application</h3>
            </div>
            <Banner />
            {/* <Menu /> */}
            <div className="table-wrapper">
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
                <table className="fl-table">
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
                <button
                    className={styles.button_create_user}
                    onClick={() => displayForm(setIsFormCreate, setIsFormUpdate, setApplicationId)}
                >
                    + Add Application
                </button>
                {/* {isFormUpdate && (
                    <UpdateApplication applicationId={applicationId} setApplicationId={setApplicationId} />
                )} */}
                <Pagination items={applicationsToShow} itemsPerPage={itemsPerPage} setItems={setApplicationsFiltered} />
                {formCreate && <Create />}
            </div>
        </div>
    );
};
