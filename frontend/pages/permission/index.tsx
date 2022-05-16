import * as React from 'react';
import type { NextPage } from 'next';
import { AppProvider } from '../../context/AppContext';
import { List } from '../../components/permission/list';
import { PaginationProvider } from '../../context/PaginationContext';

const Permissions: NextPage = () => {
    return (
        <AppProvider>
            <PaginationProvider>
                <List />
            </PaginationProvider>
        </AppProvider>
    );
};

export default Permissions;
