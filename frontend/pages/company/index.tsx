import * as React from 'react';
import type { NextPage } from 'next';
import { AppProvider } from '../../context/AppContext';
import { PaginationProvider } from '../../context/PaginationContext';
import { List } from '../../components/company/list';

const Company: NextPage = () => {
    return (
        <AppProvider>
            <PaginationProvider>
                <List />
            </PaginationProvider>
        </AppProvider>
    );
};

export default Company;
