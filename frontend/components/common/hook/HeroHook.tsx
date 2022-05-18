import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../../context/AppContext';
import Hero from '../../navigation/Hero';

export default function useHeroHook() {
    const { t } = useTranslation();
    const { formCreate, isFormUpdate } = useContext(AppContext);
    const [heroTitle, setHeroTitle] = useState<string>(t('hero.users.list.title'));
    const [heroSubTitle, setHeroSubTitle] = useState<string>(t('hero.users.list.sub_title'));

    useEffect(() => {
        if (formCreate) {
            setHeroTitle(t('hero.users.add.title'));
            setHeroSubTitle(t('hero.users.add.sub_title'));
        }

        if (isFormUpdate) {
            setHeroTitle(t('hero.users.update.title'));
            setHeroSubTitle(t('hero.users.update.sub_title'));
        }
    }, [formCreate, isFormUpdate, t]);

    return <Hero heroTitle={heroTitle} heroSubTitle={heroSubTitle} />;
}
