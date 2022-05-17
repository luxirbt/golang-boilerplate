import React from 'react';
import type { NextPage } from 'next';
import { AppProvider } from '../../context/AppContext';
import { PaginationProvider } from '../../context/PaginationContext';
import { UserProvider } from '../../context/UserContext';
import { UserContainer } from '../../components/user/UserContainer';

const Users: NextPage = () => {
    return (
        <AppProvider>
            <UserProvider>
                <PaginationProvider>
                    <UserContainer />
                </PaginationProvider>
            </UserProvider>
        </AppProvider>
    );
};

export default Users;
