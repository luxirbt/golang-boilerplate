import React from 'react';
import type { NextPage } from 'next';
import styles from '../styles/title-bar.module.scss';
import Router from 'next/router';
import { useTranslation } from 'react-i18next';

const Home: NextPage = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className="container">
                <h1 style={{ color: 'white' }}>AccountAdminTool</h1>
                <div className={styles.title_bar} onClick={() => Router.push('/user')} style={{ cursor: 'pointer' }}>
                    <h2>{t('hero.title.users')}</h2>
                    <p>{t('hero.sub_title.users')}</p>
                </div>
                <div className={styles.title_bar} onClick={() => Router.push('/company')} style={{ cursor: 'pointer' }}>
                    <h2>{t('hero.title.companies')}</h2>
                    <p>{t('hero.sub_title.companies')}</p>
                </div>
                <div
                    className={styles.title_bar}
                    onClick={() => Router.push('/permission')}
                    style={{ cursor: 'pointer' }}
                >
                    <h2>{t('hero.title.permissions')}</h2>
                    <p>{t('hero.sub_title.permissions')}</p>
                </div>
                <div
                    className={styles.title_bar}
                    onClick={() => Router.push('/application')}
                    style={{ cursor: 'pointer' }}
                >
                    <h2>{t('hero.title.applications')}</h2>
                    <p>{t('hero.sub_title.applications')}</p>
                </div>
            </div>
        </>
    );
};

export default Home;
