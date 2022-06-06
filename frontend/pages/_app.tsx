import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import '../styles/login.css';
import type { AppProps } from 'next/app';
import { Provider as AlertProvider, positions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { QueryClientProvider, QueryClient } from 'react-query';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../components/navigation/Header';
import '../i18n';
import Navbar from '../components/navigation/Navbar';
import { useRouter } from 'next/router';

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

    const router = useRouter();

    return (
        <QueryClientProvider client={queryClient}>
            <AlertProvider template={AlertTemplate} {...options}>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>AccountAdminTool</title>
                    <link rel="shortcut icon" href="/images/favicon.ico" />
                </Head>
                {!router.pathname.startsWith('/user/updatePassword') && <Header />}
                {router.pathname !== '/login' &&
                    router.pathname !== '/' &&
                    !router.pathname.startsWith('/user/updatePassword') && <Navbar />}
                <Component {...pageProps} />
            </AlertProvider>
        </QueryClientProvider>
    );
}
