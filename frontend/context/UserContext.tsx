import React from 'react';
import { useState, Dispatch, SetStateAction } from 'react';
import User from '../lib/types/models/user/user';

interface IUserContext {
    userId: number;
    setUserId: Dispatch<SetStateAction<number>>;
    setUser: Dispatch<SetStateAction<User>>;
    user: User;
}

export const UserContext = React.createContext<IUserContext>({} as IUserContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function UserProvider({ children }: any) {
    const [userId, setUserId] = useState<number>(0);
    const [user, setUser] = useState<User>({
        id: 0,
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        company_name: '',
        password: '',
        is_active: 0,
        id_company: 0,
    });

    return (
        <UserContext.Provider
            value={{
                userId,
                setUserId,
                user,
                setUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
