import React from 'react';
import { useState, Dispatch, SetStateAction } from 'react';
import Permission from '../lib/types/models/permission/permission';

interface IPermissionContext {
    permissionId: number;
    setPermissionId: Dispatch<SetStateAction<number>>;
    setPermission: Dispatch<SetStateAction<Permission>>;
    permission: Permission;
}

export const PermissionContext = React.createContext<IPermissionContext>({} as IPermissionContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PermissionProvider({ children }: any) {
    const [permissionId, setPermissionId] = useState<number>(0);
    const [permission, setPermission] = useState<Permission>({
        ID: 0,
        id_user: 0,
        id_app: 0,
        id_role: 0,
    });

    return (
        <PermissionContext.Provider
            value={{
                permissionId,
                setPermissionId,
                permission,
                setPermission,
            }}
        >
            {children}
        </PermissionContext.Provider>
    );
}
