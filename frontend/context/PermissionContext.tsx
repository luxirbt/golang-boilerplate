import React from 'react';
import { useState, Dispatch, SetStateAction } from 'react';
import PermissionDTO from '../lib/types/dto/permission/permissionDTO';

interface IPermissionContext {
    permissionId: number;
    setPermissionId: Dispatch<SetStateAction<number>>;
    permission: PermissionDTO;
    setPermission: Dispatch<SetStateAction<PermissionDTO>>;
}

export const PermissionContext = React.createContext<IPermissionContext>({} as IPermissionContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PermissionProvider({ children }: any) {
    const [permissionId, setPermissionId] = useState<number>(0);
    const [permission, setPermission] = useState<PermissionDTO>({
        ID: 0,
        username: '',
        app_name: '',
        display_name: '',
        app_id: 0,
        role: '',
        role_id: 0,
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
