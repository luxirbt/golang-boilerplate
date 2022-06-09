import React, { useEffect, useState, useContext } from 'react';
import { Pagination } from '../common/pagination';
import { PaginationContext } from '../../context/PaginationContext';
import useDisplayForm from '../common/hook/DisplayFormHook';
import useSearch from '../common/hook/SearchHook';
import useUserData from './UserDataHook';
import User from '../../lib/types/models/user/user';
import { UserContext } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';
import useSort from '../common/hook/SortHook';
import Image from 'next/image';
import Sort from '../../public/images/sort.png';
import useSearchByProperty from '../common/hook/SearchByPropertyHook';
import UserDetail from './User';

export const UserList = () => {
    const { setItemOffset, setPageCount, itemsPerPage } = useContext(PaginationContext);
    const { setUser, user: currentUser } = useContext(UserContext);

    const [valueFiltered, setValueFiltered] = useState<string>('firstname');
    const [usersFiltered, setUsersFiltered] = useState<User[]>([]);
    const [userstoshow, setUserstoshow] = useState<User[]>([]);

    const { t } = useTranslation();

    const { displayForm } = useDisplayForm();
    const { handleSearch } = useSearch();

    const { useFetchUsers } = useUserData();
    const { data: users, isLoading } = useFetchUsers();
    const { handleSort } = useSort(users as User[], setUserstoshow);
    const searchByProperty = useSearchByProperty(setValueFiltered, [
        'firstname',
        'lastname',
        'username',
        'company_name',
        'email',
    ]);

    useEffect(() => {
        users && setUsersFiltered(users.slice(0, itemsPerPage));
    }, [itemsPerPage, users]);

    useEffect(() => {
        users && setUserstoshow(users);
    }, [users]);

    if (isLoading) {
        return <p>{t('common.loading')}</p>;
    }

    return (
        <>
            {searchByProperty}
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
                        <th>
                            {t('users.list.firstname')}
                            <Image
                                src={Sort}
                                alt="img-sort"
                                onClick={handleSort}
                                id="firstname"
                                width={20}
                                height={20}
                            />
                        </th>
                        <th>
                            {t('users.list.lastname')}
                            <Image
                                src={Sort}
                                alt="img-sort"
                                onClick={handleSort}
                                id="lastname"
                                width={20}
                                height={20}
                            />
                        </th>
                        <th>
                            {t('users.list.username')}
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
                            {t('users.list.company_name')}
                            <Image
                                src={Sort}
                                alt="img-sort"
                                onClick={handleSort}
                                id="company_name"
                                width={20}
                                height={20}
                            />
                        </th>
                        <th>
                            {t('users.list.email')}
                            <Image src={Sort} alt="img-sort" onClick={handleSort} id="email" width={20} height={20} />
                        </th>
                        <th>{t('users.list.status')}</th>
                    </tr>
                </thead>

                <tbody>
                    {usersFiltered?.map((user) => (
                        <UserDetail user={user} setUser={setUser} currentUser={currentUser} key={user.id} />
                    ))}
                </tbody>
            </table>
            <div className="d-flex align-items-center">
                <button className="btn btn-primary" onClick={() => displayForm(setUser)}>
                    {t('users.list.add_user')}
                </button>

                <Pagination items={userstoshow} itemsPerPage={itemsPerPage} setItems={setUsersFiltered} />
            </div>
        </>
    );
};
