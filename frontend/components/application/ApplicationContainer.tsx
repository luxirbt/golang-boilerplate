import React, { useContext } from 'react';
import { AddApplication } from './AddApplication';
import { AppContext } from '../../context/AppContext';
import { ApplicationList } from './ApplicationList';
import useHeroHook from '../common/hook/HeroHook';
import { UpdateApplication } from './UpdateApplication';
import { ApplicationContext } from '../../context/ApplicationContext';

export const ApplicationContainer = () => {
    const { formCreate, isFormUpdate } = useContext(AppContext);
    const { setApplication, application } = useContext(ApplicationContext);

    const hero = useHeroHook('applications');

    return (
        <div className="container">
            <div className="row">{hero}</div>
            <div className="row">
                <div className="col-3">
                    {formCreate && <AddApplication />}
                    {isFormUpdate && <UpdateApplication application={application} setApplication={setApplication} />}
                </div>
                <div className={formCreate || isFormUpdate ? 'col-9' : 'col-12'}>
                    <ApplicationList />
                </div>
            </div>
        </div>
    );
};
