import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import useApplicationData from './ApplicationDataHook';
import ApplicationDTO from '../../lib/types/dto/application/applicationDTO';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from '../../styles/button.module.scss';
import { useTranslation } from 'react-i18next';

const schema = yup
    .object({
        appname: yup.string().required(),
        displayname: yup.string().required(),
    })
    .required();

export const AddApplication = () => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ApplicationDTO>({ resolver: yupResolver(schema) });
    const { useAddApplicationData } = useApplicationData();
    const { mutate } = useAddApplicationData();

    const { setIsFormCreate } = useContext(AppContext);

    const [isChecked, setIsChecked] = useState<boolean>(false);

    const onSubmit: SubmitHandler<ApplicationDTO> = (data) => {
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
                <input
                    className={styles.button}
                    type="submit"
                    style={{ marginRight: '0.5em' }}
                    value={t('applications.add.add_button')}
                />
                <button className={styles.button_cancel} onClick={() => setIsFormCreate(false)}>
                    {t('common.cancel')}
                </button>
            </div>
        </form>
    );
};
