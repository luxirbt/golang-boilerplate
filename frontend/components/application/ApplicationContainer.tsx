import React, { useContext } from 'react';
import { AddApplication } from './AddApplication';
import { AppContext } from '../../context/AppContext';
import { ApplicationList } from './ApplicationList';
import useHeroHook from '../common/hook/HeroHook';
import { UpdateApplication } from './UpdateApplication';
import { ApplicationContext } from '../../context/AppilcationContext';

export const ApplicationContainer = () => {
    const { formCreate, isFormUpdate } = useContext(AppContext);
    const { applicationId, setApplicationId } = useContext(ApplicationContext);

    const hero = useHeroHook('applications');

    return (
        <div className="container">
            <div className="row">{hero}</div>
            <div className="row">
                <div className="col-3">
                    {formCreate && <AddApplication />}
                    {isFormUpdate && (
                        <UpdateApplication applicationId={applicationId} setApplicationId={setApplicationId} />
                    )}
                </div>
                <div className={formCreate || isFormUpdate ? 'col-9' : 'col-12'}>
                    <ApplicationList />
                </div>
            </div>
        </div>
    );
};
