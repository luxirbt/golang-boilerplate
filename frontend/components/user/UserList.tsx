import React, { useEffect, useState, useContext } from 'react';
import { Pagination } from '../common/pagination';
import { PaginationContext } from '../../context/PaginationContext';
import { AppContext } from '../../context/AppContext';
import useDisplayForm from '../common/hook/DisplayFormHook';
import useSearch from '../common/hook/SearchHook';
import useUserData from './UserDataHook';
import User from '../../lib/types/models/user/user';
import { UserContext } from '../../context/UserContext';
import styles from '../../styles/button.module.scss';
import { useTranslation } from 'react-i18next';

export const UserList = () => {
    const { setItemOffset, setPageCount, itemsPerPage } = useContext(PaginationContext);
    const { setIsFormUpdate, setIsFormCreate } = useContext(AppContext);
    const { userId, setUserId } = useContext(UserContext);

    const [valueFiltered, setValueFiltered] = useState<string>('firstname');
    const [usersFiltered, setUsersFiltered] = useState<User[]>([]);
    const [userstoshow, setUserstoshow] = useState<User[]>([]);

    const { t } = useTranslation();

    const { displayForm } = useDisplayForm();
    const { handleSearch } = useSearch();

    const { useFetchUsers } = useUserData();
    const { data: users, isLoading } = useFetchUsers();

    useEffect(() => {
        users && setUsersFiltered(users.slice(0, itemsPerPage));
    }, [itemsPerPage, users]);

    useEffect(() => {
        users && setUserstoshow(users);
    }, [users]);

    const handleClick = () => {
        setIsFormUpdate(true);
        setIsFormCreate(false);
    };

    if (isLoading) {
        return <p>{t('common.loading')}</p>;
    }

    return (
        <>
            <select onChange={(e) => setValueFiltered(e.target.value)} style={{ marginRight: '0.5em' }}>
                <option value="firstname">{t('users.list.firstname')}</option>
                <option value="lastname">{t('users.list.lastname')}</option>
                <option value="username">{t('users.list.username')}</option>
                <option value="company_name">{t('users.list.company')}</option>
                <option value="email">{t('users.list.mail')}</option>
            </select>
            <input
                placeholder="Rechercher"
                onChange={(e) =>
                    handleSearch(e, users as User[], valueFiltered, setPageCount, 10, setItemOffset, setUserstoshow)
                }
                type="search"
            />
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>{t('users.list.firstname')}</th>
                        <th>{t('users.list.lastname')}</th>
                        <th>{t('users.list.username')}</th>
                        <th>{t('users.list.company')}</th>
                        <th>{t('users.list.mail')}</th>
                        <th>{t('users.list.status')}</th>
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
            <div className="d-flex align-items-center">
                <button
                    className={styles.button}
                    onClick={() => displayForm(setIsFormCreate, setIsFormUpdate, setUserId)}
                >
                    {t('users.list.add_user')}
                </button>

                <Pagination items={userstoshow} itemsPerPage={itemsPerPage} setItems={setUsersFiltered} />
            </div>
        </>
    );
};
