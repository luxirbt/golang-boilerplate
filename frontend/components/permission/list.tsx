import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Banner } from '../banner';
import { UpdatePermis } from './updatePermission';
import { Create } from './addPermission';
import styles from '../../styles/position.module.scss';
import Account_manger_Logo from '../../assets/account_manager_logo_page.png';
import Image from 'next/image';
import { Pagination } from '../pagination';
import { PaginationContext } from '../../context/PaginationContext';
import { AppContext } from '../../context/AppContext';
import PermissionDTO from '../../lib/types/dto/permission/permissionDTO';
import useDisplayForm from '../common/hook/DisplayFormHook';
import useSearch from '../common/hook/SearchHook';
import useUserData from '../user/UserDataHook';
import useApplicationData from '../application/ApplicationDataHook';
import usePermissionData from './PermissionDataHook';
import User from '../../lib/types/models/user/user';
import Role from '../../lib/types/models/role/role';
import Application from '../../lib/types/models/application/application';

export const List = () => {
    const { setItemOffset, setPageCount, itemsPerPage } = useContext(PaginationContext);
    const { setIsFormUpdate, isFormUpdate, setIsFormCreate, formCreate } = useContext(AppContext);

    const [permissionId, setPermissionId] = useState<number>(0);
    const [permissionsFiltered, setPermissionsFiltered] = useState<PermissionDTO[]>([]);
    const [permissionsToShow, setPermissionToShow] = useState<PermissionDTO[]>([]);

    const { useFetchPermissions, useFetchRoles } = usePermissionData();
    const { useFetchUsers } = useUserData();
    const { useFetchApplications } = useApplicationData();

    const { data: permissions } = useFetchPermissions();
    const { data: roles } = useFetchRoles();
    const { data: users } = useFetchUsers();
    const { data: applications } = useFetchApplications();

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
        <div>
            <div>
                <div className={styles.Account_manger_Logo_Page}>
                    <Image src={Account_manger_Logo} alt="logo" />
                </div>
                <h1 className={styles.Account_manager}>Account Manager</h1>
            </div>

            <div className={styles.container_position}>
                <h1 className={styles.Title_Position}>Permissions</h1>
                <h3 className={styles.Title_PositionPage}>Manage User Permissions</h3>
            </div>
            <Banner />
            <div className="table-wrapper">
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
                <table className="fl-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>User name</th>
                            <th>Application</th>
                            <th>Role</th>
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
                <button
                    className={styles.button_create_user}
                    onClick={() => displayForm(setIsFormCreate, setIsFormUpdate, setPermissionId)}
                >
                    + Add Permission
                </button>
                {formCreate && (
                    <Create
                        users={users as User[]}
                        applications={applications as Application[]}
                        roles={roles as Role[]}
                    />
                )}
                {isFormUpdate && (
                    <UpdatePermis
                        permissionId={permissionId}
                        setPermissionId={setPermissionId}
                        applications={applications as Application[]}
                        roles={roles as Role[]}
                    />
                )}
                <Pagination items={permissionsToShow} itemsPerPage={itemsPerPage} setItems={setPermissionsFiltered} />
            </div>
        </div>
    );
};
