import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { UserContext } from '../../context/UserContext';
import useCompanyData from '../company/CompanyDataHook';
import { AddUser } from './AddUser';
import { UserList } from './UserList';
import { UpdateUser } from './UpdateUser';
import useHeroHook from '../common/hook/HeroHook';

export const UserContainer = () => {
    const { formCreate, isFormUpdate } = useContext(AppContext);
    const { setUser, user } = useContext(UserContext);

    const { useFetchCompanies } = useCompanyData();
    const { data: companies } = useFetchCompanies();

    const hero = useHeroHook('users');

    return (
        <div className="container">
            <div className="row">{hero}</div>
            <div className="row">
                <div className="col-3">
                    {formCreate && <AddUser companies={companies} />}
                    {isFormUpdate && <UpdateUser user={user} setUser={setUser} companies={companies} />}
                </div>
                <div className={formCreate || isFormUpdate ? 'col-9' : 'col-12'}>
                    <UserList />
                </div>
            </div>
        </div>
    );
};
