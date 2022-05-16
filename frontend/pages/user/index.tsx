import * as React from 'react';
import type { NextPage } from 'next';
import { AppProvider } from '../../context/AppContext';
import { PaginationProvider } from '../../context/PaginationContext';
import { List } from '../../components/user/list';

const Users: NextPage = () => {
    return (
        <AppProvider>
            <PaginationProvider>
                <List />
            </PaginationProvider>
        </AppProvider>
    );
};

export default Users;
