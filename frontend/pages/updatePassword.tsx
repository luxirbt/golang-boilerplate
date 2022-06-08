import React from 'react';
import type { NextPage } from 'next';
import { AppProvider } from '../context/AppContext';
import { UpdatePwd } from '../components/user/updatePassword';
import { UserProvider } from '../context/UserContext';

const UpdatePassword: NextPage = () => {
    return (
        <AppProvider>
            <UserProvider>
                <UpdatePwd />
            </UserProvider>
        </AppProvider>
    );
};

export default UpdatePassword;
