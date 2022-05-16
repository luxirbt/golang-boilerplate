import React from 'react';
import { useCallback, useEffect, useState, useContext } from 'react';
import { Banner } from '../banner';
import { UpdatePermis } from './updatePermission';
import { Create } from './addPermission';
import styles from '../../styles/position.module.scss';
import Account_manger_Logo from '../../assets/account_manager_logo_page.png';
import Image from 'next/image';
import { Pagination } from '../pagination';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchAll } from '../../store/action/permissionAction';
import { fetchAll as fetchApplications } from '../../store/action/applicationAction';
import { fetchAll as fetchRoles } from '../../store/action/roleAction';
import { fetchAll as fetchUsers } from '../../store/action/userAction';
import { PaginationContext } from '../../context/PaginationContext';
import { AppContext } from '../../context/AppContext';
import PermissionDTO from '../../domain/dto/permission/permissionDTO';
import User from '../../domain/models/user/user';
import useDisplayForm from '../common/hook/DisplayFormHook';
import useSearch from '../common/hook/SearchHook';

export const List = () => {
    const [permissionId, setPermissionId] = useState<number>(0);
    const [permissionsFiltered, setPermissionsFiltered] = useState<PermissionDTO[]>([]);
    const [permissionsToShow, setPermissionToShow] = useState<PermissionDTO[]>([]);
    const { setItemOffset, setPageCount, itemsPerPage } = useContext(PaginationContext);
    const { setIsFormUpdate, isFormUpdate, setIsFormCreate, formCreate } = useContext(AppContext);

    const dispatch = useAppDispatch();
    const permissions = useAppSelector((state) => state.permissions.entities);
    const applications = useAppSelector((state) => state.applications.entities);
    const roles = useAppSelector((state) => state.roles.entities);
    const users: User[] = useAppSelector((state) => state.users.entities);

    const { displayForm } = useDisplayForm();
    const { handleSearch } = useSearch();

    const getData = useCallback(async () => {
        dispatch(fetchAll());
        dispatch(fetchApplications());
        dispatch(fetchRoles());
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        getData();
    }, [getData]);

    useEffect(() => {
        setPermissionsFiltered(permissions.slice(0, itemsPerPage));
    }, [permissions, itemsPerPage]);

    useEffect(() => {
        setPermissionToShow(permissions);
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
            {/* <Menu /> */}
            <div className="table-wrapper">
                {/* <Search /> */}
                <input
                    placeholder="Rechercher"
                    onChange={(e) =>
                        handleSearch(e, permissions, 'username', setPageCount, 10, setItemOffset, setPermissionToShow)
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
                {formCreate && <Create users={users} applications={applications} roles={roles} />}
                {isFormUpdate && (
                    <UpdatePermis
                        permissionId={permissionId}
                        setPermissionId={setPermissionId}
                        applications={applications}
                        roles={roles}
                    />
                )}
                <Pagination items={permissionsToShow} itemsPerPage={itemsPerPage} setItems={setPermissionsFiltered} />
            </div>
        </div>
    );
};
