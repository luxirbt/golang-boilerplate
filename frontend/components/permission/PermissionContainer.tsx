import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { PermissionContext } from '../../context/PermissionContext';
import useApplicationData from '../application/ApplicationDataHook';
import useUserData from '../user/UserDataHook';
import { AddPermission } from './AddPermission';
import { PermissionList } from './PermissionList';
import usePermissionData from './PermissionDataHook';
import { UpdatePermission } from './UpdatePermission';

export const PermissionContainer = () => {
    const { formCreate, isFormUpdate } = useContext(AppContext);
    const { permissionId, setPermissionId } = useContext(PermissionContext);

    const { useFetchRoles } = usePermissionData();
    const { useFetchUsers } = useUserData();
    const { useFetchApplications } = useApplicationData();

    const { data: roles } = useFetchRoles();
    const { data: users } = useFetchUsers();
    const { data: applications } = useFetchApplications();

    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    {formCreate && <AddPermission users={users} applications={applications} roles={roles} />}
                    {isFormUpdate && (
                        <UpdatePermission
                            permissionId={permissionId}
                            setPermissionId={setPermissionId}
                            applications={applications}
                            roles={roles}
                        />
                    )}{' '}
                </div>
                <div className="col-9">
                    <PermissionList />
                </div>
            </div>
        </div>
    );
};
