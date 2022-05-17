import React from 'react';
import { useState, Dispatch, SetStateAction } from 'react';

interface IPermissionContext {
    permissionId: number;
    setPermissionId: Dispatch<SetStateAction<number>>;
}

export const PermissionContext = React.createContext<IPermissionContext>({} as IPermissionContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PermissionProvider({ children }: any) {
    const [permissionId, setPermissionId] = useState<number>(0);

    return (
        <PermissionContext.Provider
            value={{
                permissionId,
                setPermissionId,
            }}
        >
            {children}
        </PermissionContext.Provider>
    );
}
