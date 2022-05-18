import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import useHeroHook from '../common/hook/HeroHook';
import AddCompany from './AddCompany';
import { CompanyList } from './CompanyList';

export const CompanyContainer = () => {
    const { formCreate } = useContext(AppContext);

    const hero = useHeroHook('companies');

    return (
        <div className="container">
            <div className="row">{hero}</div>
            <div className="row">
                <div className="col-3">{formCreate && <AddCompany />}</div>
                <div className={formCreate ? 'col-9' : 'col-12'}>
                    <CompanyList />
                </div>
            </div>
        </div>
    );
};
