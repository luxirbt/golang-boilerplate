import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Hero from '../navigation/Hero';
import AddCompany from './AddCompany';
import { CompanyList } from './CompanyList';

export const CompanyContainer = () => {
    const { formCreate } = useContext(AppContext);

    return (
        <div className="container">
            <div className="row">
                <Hero heroTitle={'Gestion des companies'} heroSubTitle={'Liste des companies'} />
            </div>
            <div className="row">
                <div className="col-3">{formCreate && <AddCompany />}</div>
                <div className={formCreate ? 'col-9' : 'col-12'}>
                    <CompanyList />
                </div>
            </div>
        </div>
    );
};
