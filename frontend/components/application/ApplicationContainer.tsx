import React, { useContext } from 'react';
import { AddApplication } from './AddApplication';
import { AppContext } from '../../context/AppContext';
import { ApplicationList } from './ApplicationList';

export const ApplicationContainer = () => {
    const { formCreate } = useContext(AppContext);

    return (
        <div className="container">
            <div className="row">
                <div className="col-3">{formCreate && <AddApplication />}</div>
                <div className="col-9">
                    <ApplicationList />
                </div>
            </div>
        </div>
    );
};
