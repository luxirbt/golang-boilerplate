import React from 'react';
import type { NextPage } from 'next';
import styles from '../styles/title-bar.module.scss';
import Router from 'next/router';
import { useTranslation } from 'react-i18next';
import { AppProvider } from '../context/AppContext';

const Home: NextPage = () => {
    const { t } = useTranslation();
    return (
        <AppProvider>
            <div className="container">
                <h1 style={{ color: 'white' }}>AccountAdminTool</h1>
                <div className={styles.title_bar} onClick={() => Router.push('/user')} style={{ cursor: 'pointer' }}>
                    <h2>{t('hero.users.title')}</h2>
                    <p>{t('hero.users.list.sub_title')}</p>
                </div>
                <div className={styles.title_bar} onClick={() => Router.push('/company')} style={{ cursor: 'pointer' }}>
                    <h2>{t('hero.companies.title')}</h2>
                    <p>{t('hero.companies.list.sub_title')}</p>
                </div>
                <div
                    className={styles.title_bar}
                    onClick={() => Router.push('/permission')}
                    style={{ cursor: 'pointer' }}
                >
                    <h2>{t('hero.permissions.title')}</h2>
                    <p>{t('hero.permissions.list.sub_title')}</p>
                </div>
                <div
                    className={styles.title_bar}
                    onClick={() => Router.push('/application')}
                    style={{ cursor: 'pointer' }}
                >
                    <h2>{t('hero.applications.title')}</h2>
                    <p>{t('hero.applications.list.sub_title')}</p>
                </div>
            </div>
        </AppProvider>
    );
};

export default Home;
