import React from 'react';
import { useState, Dispatch, SetStateAction } from 'react';
import Application from '../lib/types/models/application/application';

interface IApplicationContext {
    applicationId: number;
    setApplicationId: Dispatch<SetStateAction<number>>;
    setApplication: Dispatch<SetStateAction<Application>>;
    application: Application;
}

export const ApplicationContext = React.createContext<IApplicationContext>({} as IApplicationContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ApplicationProvider({ children }: any) {
    const [applicationId, setApplicationId] = useState<number>(0);

    const [application, setApplication] = useState<Application>({
        id: 0,
        appname: '',
        url: '',
        displayname: '',
        webapp: false,
        svg_light: '',
        svg_dark: '',
        id_application: 0,
    });

    return (
        <ApplicationContext.Provider
            value={{
                applicationId,
                setApplicationId,
                application,
                setApplication,
            }}
        >
            {children}
        </ApplicationContext.Provider>
    );
}
