import React, { Dispatch, SetStateAction, useContext } from 'react';
import { useEffect } from 'react';
import styles from '../../styles/button.module.scss';
import { AppContext } from '../../context/AppContext';
import useDisplayForm from '../common/hook/DisplayFormHook';
import useApplicationData from './ApplicationDataHook';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UpdateApplicationDTO from '../../lib/types/dto/application/updateApplicationDTO';
import { useTranslation } from 'react-i18next';

interface IUpdateApplication {
    applicationId: number;
    setApplicationId: Dispatch<SetStateAction<number>>;
}

const schema = yup
    .object({
        appname: yup.string().required(),
        url: yup.string().required(),
        displayname: yup.string().required(),
        webapp: yup.boolean(),
    })
    .required();

export const UpdateApplication = ({ applicationId, setApplicationId }: IUpdateApplication) => {
    const { t } = useTranslation();

    const { setIsFormUpdate } = useContext(AppContext);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UpdateApplicationDTO>({ resolver: yupResolver(schema) });

    const { useFetchApplication, useAddApplicationData } = useApplicationData();
    const { data: application, refetch } = useFetchApplication(applicationId);
    const { mutate } = useAddApplicationData();

    const { handleBackToMenu } = useDisplayForm();

    useEffect(() => {
        if (application) {
            console.log(application);
            refetch();
            setValue('appname', application.appname);
            setValue('url', application.url);
            setValue('displayname', application.displayname);
            setValue('webapp', application.webapp);
        }
    }, [refetch, setValue, application, applicationId]);

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
                <input {...register('appname')} defaultValue={application?.appname} className="form-control" />
                <p>{errors.appname?.message}</p>
            </div>

            <div className="form-group">
                <label>{t('applications.list.url')}</label>
                <input {...register('url')} defaultValue={application?.url} className="form-control" />
                <p>{errors.url?.message}</p>
            </div>
            <div className="form-group">
                <label>{t('applications.list.display_name')}</label>
                <input {...register('displayname')} defaultValue={application?.displayname} className="form-control" />
                <p>{errors.displayname?.message}</p>
            </div>
            <div className="form-group">
                <label style={{ marginRight: '0.5em' }}>{t('applications.list.web_app')}</label>
                <input {...register('webapp')} defaultChecked={application?.webapp} type="checkbox" />
            </div>
            <div className="form-group">
                <label>{t('applications.list.svg_light')}</label>
                <input {...register('svg_light')} type="file" accept={'.svg'} className="form-control" />
            </div>
            <div className="form-group">
                <label>{t('applications.list.svg_dark')}</label>
                <input {...register('svg_dark')} type="file" accept={'.svg'} className="form-control" />
            </div>
            <div className="d-flex align-items-center" style={{ marginTop: '1em' }}>
                <button className={styles.button}>{t('users.update.button_update')}</button>
                <button className="btn btn-danger" onClick={() => handleBackToMenu(setApplicationId, setIsFormUpdate)}>
                    {t('common.cancel')}
                </button>
            </div>
        </form>
    );
};
