import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { useState, FormEvent, useContext } from 'react';
import styles from '../../styles/Application.module.scss';
import { useAlert } from 'react-alert';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchById, updateApplication } from '../../store/action/applicationAction';
import { AppContext } from '../../context/AppContext';
import useDisplayForm from '../common/hook/DisplayFormHook';

interface IUpdateApplication {
    applicationId: number;
    setApplicationId: Dispatch<SetStateAction<number>>;
}

export const UpdateApplication = ({ applicationId, setApplicationId }: IUpdateApplication) => {
    const { setIsFormUpdate } = useContext(AppContext);

    const [appname, setAppname] = useState<string>('');
    const [url, setUrl] = useState<string>('');

    const alert = useAlert();

    const dispatch = useAppDispatch();
    const application = useAppSelector((state) => state.applications.entity);

    const { handleBackToMenu } = useDisplayForm();

    const getApplication = useCallback(() => {
        dispatch(fetchById(applicationId));
    }, [applicationId, dispatch]);

    useEffect(() => {
        getApplication();
    }, [getApplication]);

    useEffect(() => {
        setAppname(application.appname);
        setUrl(application.url);
    }, [application]);

    const updateStatus = () => {
        dispatch(
            updateApplication({
                id: applicationId,
                appname,
                url,
                displayname: '',
                webapp: false,
                svg_dark: '',
                svg_light: '',
                id_application: applicationId,
            }),
        )
            .unwrap()
            .then(() => alert.success('Application modified successfully'))
            .catch(() => alert.error('Failed to modify application'));
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        updateStatus();
        setIsFormUpdate(false);
    };

    return (
        <div className={styles.Container_Formulaire}>
            <button
                className={styles.Button_Cancel}
                onClick={() => handleBackToMenu(setApplicationId, setIsFormUpdate)}
            >
                cancel
            </button>
            <form onSubmit={submit}>
                <div>
                    <input
                        className={styles.Input_Formulaire}
                        placeholder="Application name"
                        defaultValue={appname}
                        onChange={(e) => setAppname(e.target.value)}
                    />
                    <input
                        className={styles.Input_Formulaire}
                        placeholder="url"
                        defaultValue={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <div>
                    <button className={styles.Button_Update_Application}>update Application</button>
                </div>
            </form>
        </div>
    );
};
