import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Pagination } from '../common/pagination';
import { PaginationContext } from '../../context/PaginationContext';
import { AppContext } from '../../context/AppContext';
import PermissionDTO from '../../lib/types/dto/permission/permissionDTO';
import useDisplayForm from '../common/hook/DisplayFormHook';
import useSearch from '../common/hook/SearchHook';
import usePermissionData from './PermissionDataHook';
import styles from '../../styles/button.module.scss';
import { useTranslation } from 'react-i18next';

export const PermissionList = () => {
    const { t } = useTranslation();
    const { setItemOffset, setPageCount, itemsPerPage } = useContext(PaginationContext);
    const { setIsFormUpdate, setIsFormCreate } = useContext(AppContext);

    const [permissionId, setPermissionId] = useState<number>(0);
    const [permissionsFiltered, setPermissionsFiltered] = useState<PermissionDTO[]>([]);
    const [permissionsToShow, setPermissionToShow] = useState<PermissionDTO[]>([]);

    const { useFetchPermissions } = usePermissionData();

    const { data: permissions } = useFetchPermissions();

    const { displayForm } = useDisplayForm();
    const { handleSearch } = useSearch();

    useEffect(() => {
        permissions && setPermissionsFiltered(permissions.slice(0, itemsPerPage));
    }, [permissions, itemsPerPage]);

    useEffect(() => {
        permissions && setPermissionToShow(permissions);
    }, [permissions]);

    const handleClick = () => {
        setIsFormUpdate(true);
        setIsFormCreate(false);
    };

    return (
        <>
            <input
                placeholder="Rechercher"
                onChange={(e) =>
                    handleSearch(
                        e,
                        permissions as PermissionDTO[],
                        'username',
                        setPageCount,
                        10,
                        setItemOffset,
                        setPermissionToShow,
                    )
                }
                type="search"
            />
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>{t('permissions.list.username')}</th>
                        <th>{t('permissions.list.application')}</th>
                        <th>{t('permissions.list.role')}</th>
                    </tr>
                </thead>

                <tbody>
                    {permissionsFiltered?.map((permission, index: number) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="radio"
                                    value={permission.ID}
                                    name="check"
                                    onChange={(e) => setPermissionId(parseInt(e.target.value))}
                                    onClick={handleClick}
                                    checked={permission.ID === permissionId}
                                />
                            </td>
                            <td>{permission.username}</td>
                            <td>{permission.app_name}</td>
                            <td>{permission.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex align-items-center">
                <button
                    className={styles.button}
                    onClick={() => displayForm(setIsFormCreate, setIsFormUpdate, setPermissionId)}
                >
                    {t('permissions.add.add_button')}
                </button>
                <Pagination items={permissionsToShow} itemsPerPage={itemsPerPage} setItems={setPermissionsFiltered} />
            </div>
        </>
    );
};
