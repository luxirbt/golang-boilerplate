import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import AddCompany from './AddCompany';
import { CompanyList } from './CompanyList';

export const CompanyContainer = () => {
    const { formCreate } = useContext(AppContext);

    return (
        <div className="container">
            <div className="row">
                <div className="col-3">{formCreate && <AddCompany />}</div>
                <div className="col-9">
                    <CompanyList />
                </div>
            </div>
        </div>
    );
};
