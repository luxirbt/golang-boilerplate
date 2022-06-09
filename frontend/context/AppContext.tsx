import axios from 'axios';
import Router from 'next/router';
import React, { useEffect } from 'react';
import { useState, Dispatch, SetStateAction } from 'react';

interface IAppContext {
    formCreate: boolean;
    setIsFormCreate: Dispatch<SetStateAction<boolean>>;
    isFormUpdate: boolean;
    setIsFormUpdate: Dispatch<SetStateAction<boolean>>;
    resetFilter: boolean;
    setResetFilter: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = React.createContext<IAppContext>({} as IAppContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AppProvider({ children }: any) {
    const [formCreate, setIsFormCreate] = useState<boolean>(false);
    const [isFormUpdate, setIsFormUpdate] = useState<boolean>(false);
    const [resetFilter, setResetFilter] = useState<boolean>(false);

    useEffect(() => {
        !Router.pathname.startsWith('/updatePassword') &&
            axios.get('/login/token', { withCredentials: true }).catch(() => {
                Router.push('/login');
            });
    }, []);

    return (
        <AppContext.Provider
            value={{
                formCreate,
                setIsFormCreate,
                isFormUpdate,
                setIsFormUpdate,
                resetFilter,
                setResetFilter,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
