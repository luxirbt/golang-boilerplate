import React, { useContext } from 'react';
import styles from '../../styles/Permission.module.scss';
import { AppContext } from '../../context/AppContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import usePermissionData from './PermissionDataHook';
import Application from '../../lib/types/models/application/application';
import Role from '../../lib/types/models/role/role';
import User from '../../lib/types/models/user/user';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AddPermissionDTO from '../../lib/types/dto/permission/addPermissionDTO';

interface PermissionFormProps {
    users: User[];
    applications: Application[];
    roles: Role[];
}

const schema = yup
    .object({
        userId: yup.number().required().positive(),
        appId: yup.number().required().positive(),
        roleId: yup.number().required().positive(),
    })
    .required();

export const Create = ({ users, applications, roles }: PermissionFormProps) => {
    const { setIsFormCreate } = useContext(AppContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddPermissionDTO>({ resolver: yupResolver(schema) });

    const { useAddPermission } = usePermissionData();
    const { mutate } = useAddPermission();

    const submit: SubmitHandler<AddPermissionDTO> = (data) => {
        mutate({ userId: data.userId, appId: data.appId, roleId: data.roleId });
    };

    return (
        <div className={styles.Container_Formulaire}>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <select {...register('userId')} className={styles.Input_Formulaire}>
                        <option value="">--Please choose an user--</option>
                        {users?.map((user: User, index: number) => (
                            <option key={index} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                    <p>{errors.userId?.message}</p>
                </div>
                <div>
                    <select {...register('appId')} className={styles.Input_Formulaire}>
                        <option value="">--Please choose an application--</option>
                        {applications?.map((application: Application, index: number) => (
                            <option key={index} value={application.id}>
                                {application.appname}
                            </option>
                        ))}
                    </select>
                    <p>{errors.appId?.message}</p>
                    <select {...register('roleId')} className={styles.Input_Formulaire}>
                        <option value="">--Please choose a role--</option>
                        {roles?.map((role: Role, index: number) => (
                            <option key={index} value={role.id}>
                                {role.denomination}
                            </option>
                        ))}
                    </select>
                    <p>{errors.roleId?.message}</p>
                </div>
                <input type="submit" />
                <button className={styles.Button_Cancel_Permission} onClick={() => setIsFormCreate(false)}>
                    Cancel
                </button>
            </form>
        </div>
    );
};
