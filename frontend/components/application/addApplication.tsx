import React, { useContext } from 'react';
import styles from '../../styles/Application.module.scss';
import { AppContext } from '../../context/AppContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import useApplicationData from './ApplicationDataHook';
import ApplicationDTO from '../../lib/types/dto/application/applicationDTO';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
    .object({
        appname: yup.string().required(),
        url: yup.string().required(),
        displayname: yup.string().required(),
    })
    .required();

export const Create = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ApplicationDTO>({ resolver: yupResolver(schema) });
    const { useAddApplicationData } = useApplicationData();
    const { mutate } = useAddApplicationData();

    const { setIsFormCreate } = useContext(AppContext);

    const onSubmit: SubmitHandler<ApplicationDTO> = (data) => {
        console.log(data);
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
        <div className={styles.Container_Formulaire}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className={styles.Tite_Input}>Application name</label>
                    <input {...register('appname')} className={styles.Input_Formulaire} />
                    <p>{errors.appname?.message}</p>
                </div>
                <div>
                    <label className={styles.Tite_Input}>URL</label>
                    <input {...register('url')} className={styles.Input_Formulaire} />
                    <p>{errors.url?.message}</p>
                </div>
                <div>
                    <label className={styles.Tite_Input}>Display name</label>
                    <input {...register('displayname')} className={styles.Input_Formulaire} />
                    <p>{errors.displayname?.message}</p>
                </div>
                <div>
                    <label className={styles.Tite_Input}>Web app</label>
                    <input {...register('webapp')} type="radio" className={styles.Input_Formulaire} />
                    <br></br>
                    <br></br>
                    <label className={styles.Tite_Input}>Svg light</label>
                    <input {...register('svg_light')} type="file" accept={'.svg'} />
                    <label className={styles.Tite_Input}>Svg dark</label>
                    <input {...register('svg_dark')} type="file" accept={'.svg'} />
                </div>
                <input type="submit" />
                <button onClick={() => setIsFormCreate(false)}>cancel</button>
            </form>
        </div>
    );
};
