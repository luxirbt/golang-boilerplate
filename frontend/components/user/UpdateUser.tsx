import React, { Dispatch, SetStateAction, useContext } from 'react';
import { useEffect } from 'react';
import styles from '../../styles/button.module.scss';
import { AppContext } from '../../context/AppContext';
import useDisplayForm from '../common/hook/DisplayFormHook';
import useUserData from './UserDataHook';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UpdateUserDTO from '../../lib/types/dto/user/updateUserDTO';
import Company from '../../lib/types/models/company/company';
import { useTranslation } from 'react-i18next';

interface IUpdateUser {
    userId: number;
    setUserId: Dispatch<SetStateAction<number>>;
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

export const UpdateUser = ({ userId, setUserId, companies }: IUpdateUser) => {
    const { t } = useTranslation();

    const { setIsFormUpdate } = useContext(AppContext);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UpdateUserDTO>({ resolver: yupResolver(schema) });

    const { useFetchUser, useUpdateUser } = useUserData();
    const { data: user, refetch } = useFetchUser(userId);
    const { mutate } = useUpdateUser(userId);

    const { handleBackToMenu } = useDisplayForm();

    useEffect(() => {
        if (user) {
            refetch();
            setValue('firstname', user.firstname);
            setValue('lastname', user.lastname);
            setValue('username', user.username);
            setValue('email', user.email);
            setValue('id_company', user.id_company);
            setValue('is_active', user.is_active);
        }
    }, [refetch, setValue, user, userId]);

    const submit: SubmitHandler<UpdateUserDTO> = (data) => {
        mutate({
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            email: data.email,
            id_company: data.id_company,
            is_active: data.is_active,
        });
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="form-group">
                <label>First name</label>
                <input
                    {...register('firstname')}
                    className="form-control"
                    placeholder={t('users.list.firtname')}
                    defaultValue={user?.firstname}
                />
                <p>{errors.firstname?.message}</p>
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input
                    {...register('lastname')}
                    className="form-control"
                    placeholder={t('users.list.lastname')}
                    defaultValue={user?.lastname}
                />
                <p>{errors.lastname?.message}</p>
            </div>

            <div className="form-group">
                <label>User name</label>
                <input
                    {...register('username')}
                    className="form-control"
                    placeholder={t('users.list.username')}
                    defaultValue={user?.username}
                />
                <p>{errors.username?.message}</p>
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    {...register('email')}
                    className="form-control"
                    placeholder={t('users.list.mail')}
                    defaultValue={user?.email}
                />
                <p>{errors.email?.message}</p>
            </div>

            <div className="form-group">
                <label>Company</label>
                <select className="form-select" {...register('id_company')}>
                    <option value="">{t('users.list.company')}</option>
                    {companies?.map((company, index: number) => (
                        <option selected={company.id === user?.id_company} key={index} value={company.id}>
                            {company.name}
                        </option>
                    ))}
                </select>
                <p>{errors.id_company?.message}</p>
            </div>

            <div className="form-group">
                <label>Is active</label>
                <input {...register('is_active')} defaultChecked={user?.is_active === 1} type="checkbox" />
                <p>{errors.email?.message}</p>
            </div>

            <button className={styles.button}>{t('users.update.button_update')}</button>
            <button className="btn btn-danger" onClick={() => handleBackToMenu(setUserId, setIsFormUpdate)}>
                {t('common.cancel')}
            </button>
        </form>
    );
};
