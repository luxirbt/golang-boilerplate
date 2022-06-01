import React from 'react';
import { useState, Dispatch, SetStateAction } from 'react';

interface IApplicationContext {
    applicationId: number;
    setApplicationId: Dispatch<SetStateAction<number>>;
}

export const ApplicationContext = React.createContext<IApplicationContext>({} as IApplicationContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ApplicationProvider({ children }: any) {
    const [applicationId, setApplicationId] = useState<number>(0);

    return (
        <ApplicationContext.Provider
            value={{
                applicationId,
                setApplicationId,
            }}
        >
            {children}
        </ApplicationContext.Provider>
    );
}
