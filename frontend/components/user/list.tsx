import React, { useCallback, useEffect, useState, useContext } from 'react';
import User from '../../domain/models/user/user';
import { UpdateUsr } from '../../components/user/updateUser';
import { Banner } from '../banner';
import { Menu } from '../menu';
import { Pagination } from '../pagination';
import styles from '../../styles/position.module.scss';
import Account_manger_Logo from '../../assets/account_manager_logo_page.png';
import Image from 'next/image';
import { Create } from '../../components/user/create';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchAll } from '../../store/action/userAction';
import { fetchAll as fetchCompanies } from '../../store/action/companyAction';
import { PaginationContext } from '../../context/PaginationContext';
import { AppContext } from '../../context/AppContext';
import useDisplayForm from '../common/hook/DisplayFormHook';
import useSearch from '../common/hook/SearchHook';

export const List = () => {
    const [userId, setUserId] = useState<number>(0);
    const [valueFilterd, setValueFilterd] = useState<string>('firstname');
    const [usersFiltered, setUsersFiltered] = useState<User[]>([]);
    const dispatch = useAppDispatch();
    const users: User[] = useAppSelector((state) => state.users.entities);
    const companies = useAppSelector((state) => state.companies.entities);
    const { setIsFormUpdate, isFormUpdate, setIsFormCreate, formCreate } = useContext(AppContext);
    const [userstoshow, setUserstoshow] = useState<User[]>([]);
    const { setItemOffset, setPageCount, itemsPerPage } = useContext(PaginationContext);

    const { displayForm } = useDisplayForm();
    const { handleSearch } = useSearch();

    const getUsersList = useCallback(async () => {
        dispatch(fetchAll());
    }, [dispatch]);

    useEffect(() => {
        getUsersList();
    }, [getUsersList]);

    const handleClick = () => {
        setIsFormUpdate(true);
        setIsFormCreate(false);
    };
    useEffect(() => {
        setUsersFiltered(users.slice(0, itemsPerPage));
    }, [itemsPerPage, users]);

    const getCompaniesList = useCallback(async () => {
        dispatch(fetchCompanies());
    }, [dispatch]);

    useEffect(() => {
        getCompaniesList();
    }, [getCompaniesList]);

    useEffect(() => {
        setUserstoshow(users);
    }, [users]);

    return (
        <div>
            <div className={styles.Account_manger_Logo_Page}>
                <Image src={Account_manger_Logo} alt="logo" />
            </div>
            <h1 className={styles.Account_manager}>Account Manager</h1>

            <div className={styles.container_position}>
                <h1 className={styles.Title_Position}>Users</h1>
                <h3 className={styles.Title_PositionPage}>Add or Update User</h3>
            </div>
            <Banner />
            <Menu />
            {formCreate && <Create companies={companies} />}
            <div className="table-wrapper">
                <select onChange={(e) => setValueFilterd(e.target.value)} className={styles.select_box_filter}>
                    <option value="firstname">First name</option>
                    <option value="lastname">Last name</option>
                    <option value="username">User name</option>
                    <option value="company_name">Companie</option>
                    <option value="email">Adresse mail</option>
                </select>
                <input
                    placeholder="Rechercher"
                    onChange={(e) =>
                        handleSearch(e, users, valueFilterd, setPageCount, 10, setItemOffset, setUserstoshow)
                    }
                    type="search"
                />
                <table className="fl-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>User name</th>
                            <th>Company</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usersFiltered?.map((user, index: number) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="radio"
                                        value={user.id}
                                        name="check"
                                        onChange={(e) => setUserId(parseInt(e.target.value))}
                                        checked={user.id === userId}
                                        onClick={handleClick}
                                    />
                                </td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.username}</td>
                                <td>{user.company_name}</td>
                                <td>{user.email}</td>
                                <td>{user.is_active == 1 ? 'active' : 'disabled'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    className={styles.button_create_user}
                    onClick={() => displayForm(setIsFormCreate, setIsFormUpdate, setUserId)}
                >
                    + Add User
                </button>

                {isFormUpdate && <UpdateUsr userId={userId} setUserId={setUserId} companies={companies} />}
                <Pagination items={userstoshow} itemsPerPage={itemsPerPage} setItems={setUsersFiltered} />
            </div>
        </div>
    );
};
