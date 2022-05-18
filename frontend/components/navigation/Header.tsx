/* eslint-disable @next/next/link-passhref */
import React, { ReactElement } from 'react';
import Image from 'next/image';
import Logo from '../../public/images/logo.png';
import FranceFlag from '../../public/images/flag-fr.svg';
import EnglandFlag from '../../public/images/flag-uk.svg';

import axios from 'axios';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import styles from '../../styles/header.module.scss';
export default function Header(): ReactElement {
    const { t } = useTranslation();
    const { i18n } = useTranslation();

    const handleChangeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    const router = useRouter();

    const disconnect = () => {
        localStorage.clear();
        axios.post('/login/disconnect').then(() => router.push('/login'));
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <Image src={Logo} alt="logo cliris" onClick={() => router.push('/')} />
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {router.pathname !== '/login' && (
                            <>
                                <Link href="/user">
                                    <a className={styles.links}>Users</a>
                                </Link>
                                <Link href="/permission">
                                    <a className={styles.links}>Permission</a>
                                </Link>
                                <Link href="/company">
                                    <a className={styles.links}>Company</a>
                                </Link>
                                <Link href="/application">
                                    <a className={styles.links}>Applications</a>
                                </Link>
                            </>
                        )}
                        {router.pathname !== '/login' && (
                            <a className={styles.links} onClick={disconnect}>
                                {t('common.disconnect')}
                            </a>
                        )}
                        <div style={{ marginRight: '0.5em' }}>
                            <Image
                                src={FranceFlag}
                                alt="flag-fr"
                                width={20}
                                height={20}
                                onClick={() => handleChangeLanguage('fr')}
                            />
                        </div>
                        <div>
                            <Image
                                src={EnglandFlag}
                                alt="flag-eng"
                                width={25}
                                height={20}
                                onClick={() => handleChangeLanguage('en')}
                            />
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
