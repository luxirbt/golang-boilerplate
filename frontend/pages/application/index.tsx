import * as React from 'react';
import type { NextPage } from 'next';
import { AppProvider } from '../../context/AppContext';
import { List } from '../../components/application/list';
import { PaginationProvider } from '../../context/PaginationContext';

const Applications: NextPage = () => {
    return (
        <AppProvider>
            <PaginationProvider>
                <List />
            </PaginationProvider>
        </AppProvider>
    );
};

export default Applications;
