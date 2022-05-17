import React from 'react';
import '../styles/globals.css';
import '../styles/login.css';
import '../styles/list.css';
import '../styles/formulaire.css';
import '../styles/menu.css';
import '../styles/banner.css';
import type { AppProps } from 'next/app';
import { Provider as AlertProvider, positions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Banner } from '../components/banner';
import { QueryClientProvider, QueryClient } from 'react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});

export default function App({ Component, pageProps }: AppProps) {
    const options = {
        timeout: 5000,
        position: positions.BOTTOM_CENTER,
    };

    return (
        <QueryClientProvider client={queryClient}>
            <AlertProvider template={AlertTemplate} {...options}>
                <Banner />
                <Component {...pageProps} />
            </AlertProvider>
        </QueryClientProvider>
    );
}
