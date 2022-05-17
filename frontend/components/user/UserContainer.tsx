import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { UserContext } from '../../context/UserContext';
import useCompanyData from '../company/CompanyDataHook';
import { AddUser } from './AddUser';
import { UserList } from './UserList';
import { UpdateUser } from './UpdateUser';

export const UserContainer = () => {
    const { formCreate, isFormUpdate } = useContext(AppContext);
    const { userId, setUserId } = useContext(UserContext);

    const { useFetchCompanies } = useCompanyData();
    const { data: companies } = useFetchCompanies();

    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    {formCreate && <AddUser companies={companies} />}
                    {isFormUpdate && <UpdateUser userId={userId} setUserId={setUserId} companies={companies} />}
                </div>
                <div className="col-9">
                    <UserList />
                </div>
            </div>
        </div>
    );
};
