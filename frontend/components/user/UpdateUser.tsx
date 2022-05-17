import React, { Dispatch, SetStateAction, useContext } from 'react';
import { useEffect } from 'react';
import styles from '../../styles/updateUser.module.scss';
import { AppContext } from '../../context/AppContext';
import useDisplayForm from '../common/hook/DisplayFormHook';
import useUserData from './UserDataHook';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UpdateUserDTO from '../../lib/types/dto/user/updateUserDTO';
import Company from '../../lib/types/models/company/company';

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
    const { setIsFormUpdate } = useContext(AppContext);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UpdateUserDTO>({ resolver: yupResolver(schema) });

    const { useFetchUser, useUpdateUser } = useUserData();
    const { data: user } = useFetchUser(userId);
    const { mutate } = useUpdateUser(userId);

    const { handleBackToMenu } = useDisplayForm();

    useEffect(() => {
        if (user) {
            setValue('firstname', user.firstname);
            setValue('lastname', user.lastname);
            setValue('username', user.username);
            setValue('email', user.email);
            setValue('id_company', user.id_company);
        }
    }, [setValue, user]);

    const submit: SubmitHandler<UpdateUserDTO> = (data) => {
        mutate({
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            email: data.email,
            id_company: data.id_company,
        });
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="form-group">
                <label className={styles.Tite_Input}>First name</label>
                <input
                    {...register('firstname')}
                    className="form-control"
                    placeholder="First name"
                    defaultValue={user?.firstname}
                />
                <p>{errors.firstname?.message}</p>
            </div>

            <div className="form-group">
                <label className={styles.Tite_Input}>Last name</label>
                <input
                    {...register('lastname')}
                    className="form-control"
                    placeholder="Last name"
                    defaultValue={user?.lastname}
                />
                <p>{errors.lastname?.message}</p>
            </div>

            <div className="form-group">
                <label className={styles.Tite_Input}>User name</label>
                <input
                    {...register('username')}
                    className="form-control"
                    placeholder="User name"
                    defaultValue={user?.username}
                />
                <p>{errors.username?.message}</p>
            </div>

            <div className="form-group">
                <label className={styles.Tite_Input}>Email</label>
                <input {...register('email')} className="form-control" placeholder="Email" defaultValue={user?.email} />
                <p>{errors.email?.message}</p>
            </div>

            <div className="form-group">
                <label className={styles.Tite_Input}>Company</label>
                <select className="form-select" {...register('id_company')}>
                    <option value="">--Please choose a company--</option>
                    {companies?.map((company, index: number) => (
                        <option selected={company.id === user?.id_company} key={index} value={company.id}>
                            {company.name}
                        </option>
                    ))}
                </select>
                <p>{errors.id_company?.message}</p>
            </div>
            <button className={styles.Button_Update_User}> Update user</button>
            <button className={styles.Button_Cancel} onClick={() => handleBackToMenu(setUserId, setIsFormUpdate)}>
                cancel
            </button>
        </form>
    );
};
