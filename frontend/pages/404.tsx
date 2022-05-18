import React, { ReactElement } from 'react';
import Logo from '../public/images/illustration_404.png';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Hero from '../components/navigation/Hero';

export default function Custom404(): ReactElement {
    const { t } = useTranslation();

    return (
        <div className="container" style={{ marginTop: '1em' }}>
            <Hero heroTitle={t('404.title')} heroSubTitle={t('404.sub_title')} />
            <div className="d-flex justify-content-center">
                <Image src={Logo} alt="logo-404" />
            </div>
        </div>
    );
}
