import React from 'react';
import { useState, Dispatch, SetStateAction } from 'react';
import Application from '../lib/types/models/application/application';

interface IApplicationContext {
    setApplication: Dispatch<SetStateAction<Application>>;
    application: Application;
}

export const ApplicationContext = React.createContext<IApplicationContext>({} as IApplicationContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ApplicationProvider({ children }: any) {
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
                application,
                setApplication,
            }}
        >
            {children}
        </ApplicationContext.Provider>
    );
}
