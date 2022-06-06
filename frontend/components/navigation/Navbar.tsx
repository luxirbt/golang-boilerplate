import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/navbar.module.scss';
import Image from 'next/image';
import Logo from '../../public/images/logo.png';

export default function Navbar() {
    const router = useRouter();
    const { t } = useTranslation();
    return (
        <nav id="sidebarMenu" className={`collapse d-lg-block ${styles.sidebar} collapse`}>
            <div className="ms-5">
                <Image src={Logo} alt="logo cliris" width={120} height={30} onClick={() => router.push('/')} />
            </div>
            <div className="position-sticky">
                <div className="list-group mx-3 mt-4">
                    <Link href="/user">
                        <a
                            className={`${styles.list_group_item} ${styles.list_group_item_action} py-2 ${
                                styles.link
                            } ${router.pathname === '/user' ? styles.active : ''}`}
                        >
                            {t('sidebar.users')}
                        </a>
                    </Link>
                    <Link href="/company">
                        <a
                            className={`${styles.list_group_item} ${styles.list_group_item_action} py-2 ${
                                styles.link
                            } ${router.pathname === '/company' ? styles.active : ''}`}
                        >
                            {t('sidebar.company')}
                        </a>
                    </Link>
                    <Link href="/permission">
                        <a
                            className={`${styles.list_group_item} ${styles.list_group_item_action} py-2 ${
                                styles.link
                            } ${router.pathname === '/permission' ? styles.active : ''}`}
                        >
                            {t('sidebar.permission')}
                        </a>
                    </Link>
                    <Link href="/application">
                        <a
                            className={`${styles.list_group_item} ${styles.list_group_item_action} py-2 ${
                                styles.link
                            } ${router.pathname === '/application' ? styles.active : ''}`}
                        >
                            {t('sidebar.application')}
                        </a>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
