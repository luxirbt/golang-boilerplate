import * as React from 'react';
import type { NextPage } from 'next';
import { AppProvider } from '../context/AppContext';
import { PaginationProvider } from '../context/PaginationContext';
import { ApplicationContainer } from '../components/application/ApplicationContainer';
import { ApplicationProvider } from '../context/ApplicationContext';

const Applications: NextPage = () => {
    return (
        <AppProvider>
            <PaginationProvider>
                <ApplicationProvider>
                    <ApplicationContainer />
                </ApplicationProvider>
            </PaginationProvider>
        </AppProvider>
    );
};

export default Applications;
