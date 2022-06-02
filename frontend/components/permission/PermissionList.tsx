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
import { PermissionContext } from '../../context/PermissionContext';
import Image from 'next/image';
import useSort from '../common/hook/SortHook';
import Sort from '../../public/images/sort.png';

export const PermissionList = () => {
    const { t } = useTranslation();
    const { setItemOffset, setPageCount, itemsPerPage } = useContext(PaginationContext);
    const { setIsFormUpdate, setIsFormCreate } = useContext(AppContext);
    const { setPermission, setPermissionId, permission: currentPermission } = useContext(PermissionContext);

    const [permissionsFiltered, setPermissionsFiltered] = useState<PermissionDTO[]>([]);
    const [permissionsToShow, setPermissionToShow] = useState<PermissionDTO[]>([]);

    const { useFetchPermissions } = usePermissionData();

    const { data: permissions, isLoading } = useFetchPermissions();

    const { displayForm } = useDisplayForm();
    const { handleSearch } = useSearch();
    const { handleSort } = useSort(permissions as PermissionDTO[], setPermissionToShow);

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
                        <th>
                            {t('permissions.list.username')}
                            <Image
                                src={Sort}
                                alt="img-sort"
                                onClick={handleSort}
                                id="username"
                                width={20}
                                height={20}
                            />
                        </th>
                        <th>
                            {t('permissions.list.application')}
                            <Image
                                src={Sort}
                                alt="img-sort"
                                onClick={handleSort}
                                id="app_name"
                                width={20}
                                height={20}
                            />
                        </th>
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
                                    onChange={() => setPermission(permission)}
                                    onClick={handleClick}
                                    checked={permission.ID === currentPermission.ID}
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
