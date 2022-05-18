import React, { useContext } from 'react';
import { AddApplication } from './AddApplication';
import { AppContext } from '../../context/AppContext';
import { ApplicationList } from './ApplicationList';
import useHeroHook from '../common/hook/HeroHook';

export const ApplicationContainer = () => {
    const { formCreate, isFormUpdate } = useContext(AppContext);

    const hero = useHeroHook('applications');

    return (
        <div className="container">
            <div className="row">{hero}</div>
            <div className="row">
                <div className="col-3">{formCreate && <AddApplication />}</div>
                <div className={formCreate || isFormUpdate ? 'col-9' : 'col-12'}>
                    <ApplicationList />
                </div>
            </div>
        </div>
    );
};
