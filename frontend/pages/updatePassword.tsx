import React from 'react';
import type { NextPage } from 'next';
import { AppProvider } from '../context/AppContext';
import { UpdatePwd } from '../components/user/updatePassword';

const UpdatePassword: NextPage = () => {
    return (
        <AppProvider>
            <UpdatePwd />
        </AppProvider>
    );
};

export default UpdatePassword;
