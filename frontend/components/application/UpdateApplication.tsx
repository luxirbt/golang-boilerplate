import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useEffect } from 'react';
import styles from '../../styles/button.module.scss';
import { AppContext } from '../../context/AppContext';
import useApplicationData from './ApplicationDataHook';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UpdateApplicationDTO from '../../lib/types/dto/application/updateApplicationDTO';
import { useTranslation } from 'react-i18next';
import Application from '../../lib/types/models/application/application';

interface IUpdateApplication {
    application: Application;
    setApplication: Dispatch<SetStateAction<Application>>;
}

const schema = yup
    .object({
        appname: yup.string().required(),
        url: yup.string().required(),
        displayname: yup.string().required(),
        webapp: yup.boolean(),
    })
    .required();

export const UpdateApplication = ({ application, setApplication }: IUpdateApplication) => {
    const { t } = useTranslation();
    const [isChecked, setIsChecked] = useState(false);
    const { setIsFormUpdate } = useContext(AppContext);

    const handleBackToMenu = () => {
        setIsFormUpdate(false);
        setApplication({
            id: 0,
            appname: '',
            url: '',
            displayname: '',
            webapp: false,
            svg_light: '',
            svg_dark: '',
            id_application: 0,
        });
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UpdateApplicationDTO>({ resolver: yupResolver(schema) });

    const { useUpdateApplication } = useApplicationData();
    const { mutate } = useUpdateApplication(application.id);

    useEffect(() => {
        if (application) {
            setValue('appname', application.appname);
            setValue('url', application.url);
            setValue('displayname', application.displayname);
            setValue('webapp', application.webapp);
            setIsChecked(application.webapp);
        }
    }, [setValue, application]);

    const onSubmit: SubmitHandler<UpdateApplicationDTO> = (data) => {
        mutate({
            appname: data.appname,
            url: data.url,
            displayname: data.displayname,
            webapp: data.webapp,
            svg_light: data.svg_light,
            svg_dark: data.svg_dark,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
            <div className="form-group">
                <label>{t('applications.list.appname')}</label>
                <input {...register('appname')} className="form-control" />
                <p>{errors.appname?.message}</p>
            </div>

            <div className="form-group">
                <label>{t('applications.list.url')}</label>
                <input {...register('url')} className="form-control" />
                <p>{errors.url?.message}</p>
            </div>
            <div className="form-group">
                <label>{t('applications.list.display_name')}</label>
                <input {...register('displayname')} className="form-control" />
                <p>{errors.displayname?.message}</p>
            </div>
            <div className="form-group">
                <label style={{ marginRight: '0.5em' }}>{t('applications.list.web_app')}</label>
                <input {...register('webapp')} onChange={() => setIsChecked(!isChecked)} type="checkbox" />
            </div>
            {isChecked && (
                <>
                    <div className="form-group">
                        <label>{t('applications.list.svg_light')}</label>
                        <input {...register('svg_light')} type="file" accept={'.svg'} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>{t('applications.list.svg_dark')}</label>
                        <input {...register('svg_dark')} type="file" accept={'.svg'} className="form-control" />
                    </div>
                </>
            )}

            <div className="d-flex align-items-center" style={{ marginTop: '1em' }}>
                <button className={styles.button}>{t('applications.update.update_button')}</button>
                <button className="btn btn-danger" onClick={handleBackToMenu}>
                    {t('common.cancel')}
                </button>
            </div>
        </form>
    );
};
