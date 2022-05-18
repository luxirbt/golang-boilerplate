import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../../context/AppContext';
import Hero from '../../navigation/Hero';

export default function useHeroHook(page: string) {
    const { t } = useTranslation();
    const { formCreate, isFormUpdate } = useContext(AppContext);
    const [heroTitle, setHeroTitle] = useState<string>(t('hero.users.title'));
    const [heroSubTitle, setHeroSubTitle] = useState<string>(t('hero.users.list.sub_title'));

    useEffect(() => {
        if (formCreate) {
            switch (page) {
                case 'applications':
                    setHeroTitle(t('hero.applications.title'));
                    setHeroSubTitle(t('hero.applications.add.sub_title'));
                    break;
                case 'users':
                    setHeroTitle(t('hero.users.title'));
                    setHeroSubTitle(t('hero.users.add.sub_title'));
                    break;
                case 'permissions':
                    setHeroTitle(t('hero.permissions.title'));
                    setHeroSubTitle(t('hero.permissions.add.sub_title'));
                    break;
                case 'companies':
                    setHeroTitle(t('hero.companies.title'));
                    setHeroSubTitle(t('hero.companies.add.sub_title'));
                    break;
            }
        } else if (isFormUpdate) {
            switch (page) {
                case 'applications':
                    setHeroTitle(t('hero.applications.title'));
                    setHeroSubTitle(t('hero.applications.update.sub_title'));
                    break;
                case 'users':
                    setHeroTitle(t('hero.users.title'));
                    setHeroSubTitle(t('hero.users.update.sub_title'));
                    break;
                case 'permissions':
                    setHeroTitle(t('hero.permissions.title'));
                    setHeroSubTitle(t('hero.permissions.update.sub_title'));
                    break;
                case 'companies':
                    setHeroTitle(t('hero.companies.title'));
                    setHeroSubTitle(t('hero.companies.update.sub_title'));
                    break;
            }
        } else {
            switch (page) {
                case 'applications':
                    setHeroTitle(t('hero.applications.title'));
                    setHeroSubTitle(t('hero.applications.list.sub_title'));
                    break;
                case 'users':
                    setHeroTitle(t('hero.users.title'));
                    setHeroSubTitle(t('hero.users.list.sub_title'));
                    break;
                case 'permissions':
                    setHeroTitle(t('hero.permissions.title'));
                    setHeroSubTitle(t('hero.permissions.list.sub_title'));
                    break;
                case 'companies':
                    setHeroTitle(t('hero.companies.title'));
                    setHeroSubTitle(t('hero.companies.list.sub_title'));
                    break;
            }
        }
    }, [formCreate, isFormUpdate, page, t]);

    return <Hero heroTitle={heroTitle} heroSubTitle={heroSubTitle} />;
}
