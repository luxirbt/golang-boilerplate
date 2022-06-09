/* eslint-disable @next/next/link-passhref */
import React, { ReactElement } from 'react';
import Image from 'next/image';
import FranceFlag from '../../public/images/flag-fr.svg';
import EnglandFlag from '../../public/images/flag-uk.svg';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/header.module.scss';
import Logo from '../../public/images/logo.svg';

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
                <div className="ms-4 mt-2">
                    <Image src={Logo} alt="logo cliris" width={110} height={40} onClick={() => router.push('/')} />
                </div>
                <ul className="navbar-nav ms-auto d-flex flex-row align-items-center">
                    <li className="nav-item">
                        {router.pathname !== '/login' && !router.pathname.startsWith('/updatePassword') && (
                            <a className={styles.links} onClick={disconnect} style={{ cursor: 'pointer' }}>
                                {t('common.disconnect')}
                            </a>
                        )}
                    </li>
                    <li className="nav-item">
                        <div style={{ marginRight: '0.5em' }}>
                            <Image
                                src={FranceFlag}
                                alt="flag-fr"
                                width={20}
                                height={20}
                                onClick={() => handleChangeLanguage('fr')}
                            />
                        </div>
                    </li>
                    <li className="nav-item justify-content-center">
                        <div>
                            <Image
                                src={EnglandFlag}
                                alt="flag-eng"
                                width={25}
                                height={20}
                                onClick={() => handleChangeLanguage('en')}
                            />
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
