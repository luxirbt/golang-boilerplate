import React from 'react';
import Head from 'next/head';
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
import 'bootstrap/dist/css/bootstrap.css';
import { Menu } from '../components/navigation/menu';

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
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>AccountAdminTool</title>
                    <link rel="shortcut icon" href="/images/favicon.ico" />
                </Head>
                <Menu />
                <Banner />
                <Component {...pageProps} />
            </AlertProvider>
        </QueryClientProvider>
    );
}
