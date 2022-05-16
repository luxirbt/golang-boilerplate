import React from 'react';
import { useState, FormEvent } from 'react';
import styles from '../../styles/Permission.module.scss';
import { useAlert } from 'react-alert';
import { useAppDispatch } from '../../store/store';
import { createCompany } from '../../store/action/companyAction';

export const Create = () => {
    const [name, setName] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const alert = useAlert();

    const dispatch = useAppDispatch();

    const saveCompany = async () => {
        dispatch(createCompany({ name }))
            .then(() => {
                setIsOpen(false);
                alert.success('Company created successfully');
            })
            .catch(() => alert.error('The company could not be created'));
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        saveCompany();
        setIsOpen(false);
    };

    return isOpen ? (
        <div className={styles.Container_Formulaire}>
            <button className={styles.Button_Cancel_Company} onClick={() => setIsOpen(false)}>
                cancel
            </button>

            <form onSubmit={submit}>
                <div>
                    <label className={styles.Tite_Input}>Company name</label>
                    <input className={styles.Input_Formulaire} onChange={(e) => setName(e.target.value)} required />
                </div>
                <button className={styles.Button_Create_Permission}>Add Company</button>
            </form>
        </div>
    ) : (
        <button className={styles.button_create_permission} onClick={() => setIsOpen(true)}>
            + Add Company
        </button>
    );
};
