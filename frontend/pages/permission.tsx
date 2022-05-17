import React from 'react';
import type { NextPage } from 'next';
import { AppProvider } from '../context/AppContext';
import { PaginationProvider } from '../context/PaginationContext';
import { PermissionProvider } from '../context/PermissionContext';
import { PermissionContainer } from '../components/permission/PermissionContainer';

const Permissions: NextPage = () => {
    return (
        <AppProvider>
            <PaginationProvider>
                <PermissionProvider>
                    <PermissionContainer />
                </PermissionProvider>
            </PaginationProvider>
        </AppProvider>
    );
};

export default Permissions;
