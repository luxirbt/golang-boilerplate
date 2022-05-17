import * as React from 'react';
import type { NextPage } from 'next';
import { AppProvider } from '../context/AppContext';
import { PaginationProvider } from '../context/PaginationContext';
import { ApplicationContainer } from '../components/application/ApplicationContainer';

const Applications: NextPage = () => {
    return (
        <AppProvider>
            <PaginationProvider>
                <ApplicationContainer />
            </PaginationProvider>
        </AppProvider>
    );
};

export default Applications;
