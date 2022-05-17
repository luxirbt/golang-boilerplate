import React, { useEffect, useState, useContext } from 'react';
import { Pagination } from '../common/pagination';
import { PaginationContext } from '../../context/PaginationContext';
import { AppContext } from '../../context/AppContext';
import useDisplayForm from '../common/hook/DisplayFormHook';
import useSearch from '../common/hook/SearchHook';
import useUserData from './UserDataHook';
import User from '../../lib/types/models/user/user';
import { UserContext } from '../../context/UserContext';

export const UserList = () => {
    const { setItemOffset, setPageCount, itemsPerPage } = useContext(PaginationContext);
    const { setIsFormUpdate, setIsFormCreate } = useContext(AppContext);
    const { userId, setUserId } = useContext(UserContext);

    const [valueFiltered, setValueFiltered] = useState<string>('firstname');
    const [usersFiltered, setUsersFiltered] = useState<User[]>([]);
    const [userstoshow, setUserstoshow] = useState<User[]>([]);

    const { displayForm } = useDisplayForm();
    const { handleSearch } = useSearch();

    const { useFetchUsers } = useUserData();
    const { data: users } = useFetchUsers();

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

    return (
        <>
            <button onClick={() => displayForm(setIsFormCreate, setIsFormUpdate, setUserId)}>+ Add User</button>
            <select onChange={(e) => setValueFiltered(e.target.value)}>
                <option value="firstname">First name</option>
                <option value="lastname">Last name</option>
                <option value="username">User name</option>
                <option value="company_name">Companie</option>
                <option value="email">Adresse mail</option>
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

            <Pagination items={userstoshow} itemsPerPage={itemsPerPage} setItems={setUsersFiltered} />
        </>
    );
};
