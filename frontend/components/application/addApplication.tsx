import React, { ChangeEvent, useContext } from 'react';
import { useState, FormEvent } from 'react';
import styles from '../../styles/Application.module.scss';
import { useAlert } from 'react-alert';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';

export const Create = () => {
    const [appname, setAppname] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [displayname, setDisplayname] = useState<string>('');
    const [webapp, setWebapp] = useState<boolean>(false);
    const [fileLight, setFileLight] = useState<FileList | null>();
    const [fileDark, setFileDark] = useState<FileList | null>();

    const alert = useAlert();
    const { setIsFormCreate } = useContext(AppContext);

    const saveApplication = () => {
        if (validation()) {
            const formData = new FormData();
            fileLight && formData.append('filelight', fileLight[0]);
            fileDark && formData.append('filedark', fileDark[0]);
            formData.append('appname', appname);
            formData.append('url', url);
            formData.append('displayname', displayname);
            formData.append('webapp', webapp.toString());
            axios
                .post(`api/application`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(() => alert.success('Application created successfully'))
                .catch(() => alert.error('Application creation failed'));
        }
    };

    const validation = () => {
        let formIsValid = true;

        if (!appname) {
            alert.error('appname manquant');
            formIsValid = false;
        }

        if (!url) {
            alert.error('Url manquant');
            formIsValid = false;
        }

        if (!displayname) {
            alert.error('Displayname manquant');
            formIsValid = false;
        }

        if (!webapp) {
            alert.error('Webapp manquant');
            formIsValid = false;
        }

        if (!fileLight) {
            alert.error('Fichier light manquant');
            formIsValid = false;
        }

        if (!fileDark) {
            alert.error('Fichier dark manquant');
            formIsValid = false;
        }

        return formIsValid;
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        saveApplication();
        setIsFormCreate(false);
    };

    const handleChange = () => {
        setWebapp(true);
    };

    const handlerUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const { files, name } = e.target;
        name === 'svg_light' ? setFileLight(files) : setFileDark(files);
    };

    return (
        <div className={styles.Container_Formulaire}>
            <button className={styles.Button_Cancel_Application} onClick={() => setIsFormCreate(false)}>
                cancel
            </button>
            <form onSubmit={submit}>
                <div>
                    <label className={styles.Tite_Input}>Application name</label>
                    <input className={styles.Input_Formulaire} onChange={(e) => setAppname(e.target.value)} required />
                </div>
                <div>
                    <label className={styles.Tite_Input}>URL</label>
                    <input className={styles.Input_Formulaire} onChange={(e) => setUrl(e.target.value)} required />
                </div>
                <div>
                    <label className={styles.Tite_Input}>Display name</label>
                    <input
                        className={styles.Input_Formulaire}
                        onChange={(e) => setDisplayname(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className={styles.Tite_Input}>Web app</label>
                    <input type="radio" name="check" onClick={handleChange} />
                    <br></br>
                    <br></br>
                    <label className={styles.Tite_Input}>Svg light</label>
                    <input type="file" onChange={handlerUpload} accept={'.svg'} name="svg_light" />
                    <label className={styles.Tite_Input}>Svg dark</label>
                    <input type="file" onChange={handlerUpload} accept={'.svg'} name="svg_dark" />
                </div>
                <button className={styles.Button_Create_Application}>Add Application</button>
            </form>
        </div>
    );
};
