import React from 'react';
import { useState, useContext } from 'react';
import generator from 'generate-password';
import { AppContext } from '../../context/AppContext';
import AddUserDTO from '../../lib/types/dto/user/addUserDTO';
import { SubmitHandler, useForm } from 'react-hook-form';
import useUserData from './UserDataHook';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Company from '../../lib/types/models/company/company';
import styles from '../../styles/button.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
    companies: Company[];
}

const schema = yup
    .object({
        firstname: yup.string().required(),
        lastname: yup.string().required(),
        username: yup.string().required(),
        email: yup.string().email().required(),
        id_company: yup.number().required().positive(),
    })
    .required();

export const AddUser = ({ companies }: Props) => {
    const { t } = useTranslation();
    const { setIsFormCreate } = useContext(AppContext);

    const [password, setPassword] = useState<string>('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddUserDTO>({ resolver: yupResolver(schema) });

    const generatePassword = () => {
        const pwd = generator.generate({
            length: 15,
        });
        setPassword(pwd);
    };

    const { useAddUser } = useUserData();
    const { mutate } = useAddUser();

    const submit: SubmitHandler<AddUserDTO> = (data) => {
        mutate({
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.lastname,
            email: data.email,
            password,
            is_active: 0,
            id_company: data.id_company,
        });
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="d-flex flex-column">
            <div className="form-group">
                <label>{t('users.list.firstname')}</label>
                <input {...register('firstname')} className="form-control" />
                <p>{errors.firstname?.message}</p>
            </div>

            <div className="form-group">
                <label>{t('users.list.lastname')}</label>
                <input {...register('lastname')} className="form-control" />
                <p>{errors.lastname?.message}</p>
            </div>
            <div className="form-group">
                <label>{t('users.list.username')}</label>
                <input {...register('username')} className="form-control" />
                <p>{errors.username?.message}</p>
            </div>
            <div className="form-group">
                <label>{t('users.list.mail')}</label>
                <input {...register('email')} className="form-control" />
                <p>{errors.email?.message}</p>
            </div>
            <div className="form-group">
                <label>{t('users.list.password')}</label>
                <input className="form-control" value={password} required disabled />
                <input className={styles.button} type="button" value="Generate" onClick={generatePassword} />
            </div>
            <div className="form-group">
                <label>{t('users.list.company')}</label>
                <select {...register('id_company')} className="form-select">
                    <option value="">{t('users.list.choice_company')}</option>
                    {companies?.map((company, index: number) => (
                        <option key={index} value={company.id}>
                            {company.name}
                        </option>
                    ))}
                </select>
                <p>{errors.id_company?.message}</p>
            </div>
            <input type="submit" className={styles.button} value={t('users.add.add_button')} />
            <button className="btn btn-danger" onClick={() => setIsFormCreate(false)}>
                {t('common.cancel')}
            </button>
        </form>
    );
};
