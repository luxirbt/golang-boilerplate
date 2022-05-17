import React from 'react';
import { useState, useContext } from 'react';
import generator from 'generate-password';
import styles from '../../styles/User.module.scss';
import { AppContext } from '../../context/AppContext';
import AddUserDTO from '../../lib/types/dto/user/addUserDTO';
import { SubmitHandler, useForm } from 'react-hook-form';
import useUserData from './UserDataHook';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Company from '../../lib/types/models/company/company';

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

export const Create = ({ companies }: Props) => {
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
        <div className={styles.Container_Formulaire}>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <input {...register('firstname')} className={styles.Input_Formulaire} placeholder="Firstname" />
                    <p>{errors.firstname?.message}</p>

                    <input {...register('lastname')} className={styles.Input_Formulaire} placeholder="Lastname" />
                    <p>{errors.lastname?.message}</p>

                    <input {...register('username')} className={styles.Input_Formulaire} placeholder="Username" />
                    <p>{errors.username?.message}</p>

                    <input {...register('email')} className={styles.Input_Formulaire} placeholder="Email" />
                    <p>{errors.email?.message}</p>

                    <input className={styles.Input_Formulaire} value={password} required disabled />
                    <input
                        className={styles.Input_Formulaire}
                        type="button"
                        value="Generate"
                        onClick={generatePassword}
                    />

                    <select {...register('id_company')}>
                        <option value="">--Please choose a company--</option>
                        {companies?.map((company, index: number) => (
                            <option key={index} value={company.id}>
                                {company.name}
                            </option>
                        ))}
                    </select>
                    <p>{errors.id_company?.message}</p>
                </div>
                <input type="submit" />
            </form>
            <button onClick={() => setIsFormCreate(false)}>Cancel</button>
        </div>
    );
};
