import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Pagination } from '../common/pagination';
import { PaginationContext } from '../../context/PaginationContext';
import PermissionDTO from '../../lib/types/dto/permission/permissionDTO';
import useDisplayForm from '../common/hook/DisplayFormHook';
import useSearch from '../common/hook/SearchHook';
import usePermissionData from './PermissionDataHook';
import { useTranslation } from 'react-i18next';
import { PermissionContext } from '../../context/PermissionContext';
import Image from 'next/image';
import useSort from '../common/hook/SortHook';
import Sort from '../../public/images/sort.png';
import useSearchByProperty from '../common/hook/SearchByPropertyHook';
import PermissionDetail from './Permission';

export const PermissionList = () => {
    const { t } = useTranslation();
    const { setItemOffset, setPageCount, itemsPerPage } = useContext(PaginationContext);
    const { setPermission, permission: currentPermission } = useContext(PermissionContext);

    const [permissionsFiltered, setPermissionsFiltered] = useState<PermissionDTO[]>([]);
    const [permissionsToShow, setPermissionToShow] = useState<PermissionDTO[]>([]);
    const [valueFiltered, setValueFiltered] = useState<string>('username');

    const { useFetchPermissions } = usePermissionData();

    const { data: permissions, isLoading } = useFetchPermissions();

    const { displayForm } = useDisplayForm();
    const { handleSearch } = useSearch();
    const { handleSort } = useSort(permissions as PermissionDTO[], setPermissionToShow);
    const searchByProperty = useSearchByProperty(setValueFiltered, ['username', 'app_name']);

    useEffect(() => {
        permissions && setPermissionsFiltered(permissions.slice(0, itemsPerPage));
    }, [permissions, itemsPerPage]);

    useEffect(() => {
        permissions && setPermissionToShow(permissions);
    }, [permissions]);

    if (isLoading) {
        return <p>{t('common.loading')}</p>;
    }

    return (
        <>
            {searchByProperty}
            <input
                placeholder="Rechercher"
                onChange={(e) =>
                    handleSearch(
                        e,
                        permissions as PermissionDTO[],
                        valueFiltered,
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
                        <th>
                            {t('permissions.list.display_name')}
                            <Image
                                src={Sort}
                                alt="img-sort"
                                onClick={handleSort}
                                id="display_name"
                                width={20}
                                height={20}
                            />
                        </th>
                        <th>{t('permissions.list.role')}</th>
                    </tr>
                </thead>

                <tbody>
                    {permissionsFiltered?.map((permission) => (
                        <PermissionDetail
                            permission={permission}
                            setPermission={setPermission}
                            currentPermission={currentPermission}
                            key={permission.ID}
                        />
                    ))}
                </tbody>
            </table>
            <div className="d-flex align-items-center">
                <button className="btn btn-primary" onClick={() => displayForm(setPermission)}>
                    {t('permissions.add.add_button')}
                </button>
                <Pagination items={permissionsToShow} itemsPerPage={itemsPerPage} setItems={setPermissionsFiltered} />
            </div>
        </>
    );
};
