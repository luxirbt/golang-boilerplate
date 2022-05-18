import React, { useContext } from 'react';
import { AddApplication } from './AddApplication';
import { AppContext } from '../../context/AppContext';
import { ApplicationList } from './ApplicationList';
import Hero from '../navigation/Hero';

export const ApplicationContainer = () => {
    const { formCreate, isFormUpdate } = useContext(AppContext);

    return (
        <div className="container">
            <div className="row">
                <Hero heroTitle={'Gestion des applications'} heroSubTitle={'Liste des applications'} />
            </div>
            <div className="row">
                <div className="col-3">{formCreate && <AddApplication />}</div>
                <div className={formCreate || isFormUpdate ? 'col-9' : 'col-12'}>
                    <ApplicationList />
                </div>
            </div>
        </div>
    );
};
