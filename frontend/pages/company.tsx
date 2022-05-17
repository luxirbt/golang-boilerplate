import React from 'react';
import type { NextPage } from 'next';
import { AppProvider } from '../context/AppContext';
import { PaginationProvider } from '../context/PaginationContext';
import { CompanyContainer } from '../components/company/CompanyContainer';

const Company: NextPage = () => {
    return (
        <AppProvider>
            <PaginationProvider>
                <CompanyContainer />
            </PaginationProvider>
        </AppProvider>
    );
};

export default Company;
