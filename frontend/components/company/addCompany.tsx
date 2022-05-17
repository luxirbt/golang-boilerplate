import React, { ReactElement } from 'react';
import { useState } from 'react';
import styles from '../../styles/Permission.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import useCompanyData from './CompanyDataHook';

type Inputs = {
    name: string;
};

export default function Create(): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { useAddCompanyData } = useCompanyData();
    const { mutate } = useAddCompanyData();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutate(data.name);
    };

    return isOpen ? (
        <div className={styles.Container_Formulaire}>
            <button className={styles.Button_Cancel_Company} onClick={() => setIsOpen(false)}>
                cancel
            </button>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className={styles.Tite_Input}>Company name</label>
                    <input {...register('name', { required: true })} />
                    {errors.name && <span>This field is required</span>}
                </div>
                <input type="submit" />
            </form>
        </div>
    ) : (
        <button className={styles.button_create_permission} onClick={() => setIsOpen(true)}>
            + Add Company
        </button>
    );
}
