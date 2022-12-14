import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { PermissionContext } from '../../context/PermissionContext';
import useApplicationData from '../application/ApplicationDataHook';
import useUserData from '../user/UserDataHook';
import { AddPermission } from './AddPermission';
import { PermissionList } from './PermissionList';
import usePermissionData from './PermissionDataHook';
import { UpdatePermission } from './UpdatePermission';
import useHeroHook from '../common/hook/HeroHook';

export const PermissionContainer = () => {
    const { formCreate, isFormUpdate } = useContext(AppContext);
    const { permission, setPermission } = useContext(PermissionContext);

    const { useFetchRoles } = usePermissionData();
    const { useFetchUsers } = useUserData();
    const { useFetchApplications } = useApplicationData();

    const { data: roles } = useFetchRoles();
    const { data: users } = useFetchUsers();
    const { data: applications } = useFetchApplications();

    const hero = useHeroHook('permissions');

    return (
        <div className="container">
            <div className="row">{hero}</div>
            <div className="row">
                <div className="col-3">
                    {formCreate && <AddPermission users={users} applications={applications} roles={roles} />}
                    {isFormUpdate && (
                        <UpdatePermission
                            permission={permission}
                            setPermission={setPermission}
                            applications={applications}
                            roles={roles}
                        />
                    )}
                </div>
                <div className={formCreate || isFormUpdate ? 'col-9' : 'col-12'}>
                    <PermissionList />
                </div>
            </div>
        </div>
    );
};
