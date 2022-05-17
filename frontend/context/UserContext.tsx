import React from 'react';
import { useState, Dispatch, SetStateAction } from 'react';

interface IUserContext {
    userId: number;
    setUserId: Dispatch<SetStateAction<number>>;
}

export const UserContext = React.createContext<IUserContext>({} as IUserContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function UserProvider({ children }: any) {
    const [userId, setUserId] = useState<number>(0);

    return (
        <UserContext.Provider
            value={{
                userId,
                setUserId,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
