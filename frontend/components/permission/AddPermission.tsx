import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import usePermissionData from './PermissionDataHook';
import Application from '../../lib/types/models/application/application';
import Role from '../../lib/types/models/role/role';
import User from '../../lib/types/models/user/user';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AddPermissionDTO from '../../lib/types/dto/permission/addPermissionDTO';
import styles from '../../styles/button.module.scss';
import { useTranslation } from 'react-i18next';

interface PermissionFormProps {
    users: User[] | undefined;
    applications: Application[] | undefined;
    roles: Role[] | undefined;
}

const schema = yup
    .object({
        userId: yup.number().required().positive(),
        appId: yup.number().required().positive(),
        roleId: yup.number().required().positive(),
    })
    .required();

export const AddPermission = ({ users, applications, roles }: PermissionFormProps) => {
    const { t } = useTranslation();
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
        <form onSubmit={handleSubmit(submit)} className="d-flex flex-column">
            <div className="form-group">
                <label>{t('permissions.list.username')}</label>
                <select {...register('userId')} className="form-select">
                    <option value="">{t('permissions.list.choice_username')}</option>
                    {users?.map((user: User, index: number) => (
                        <option key={index} value={user.id}>
                            {user.username}
                        </option>
                    ))}
                </select>
                <p>{errors.userId?.message}</p>
            </div>
            <div className="form-group">
                <label>{t('permissions.list.application')}</label>
                <select {...register('appId')} className="form-select">
                    <option value="">{t('permissions.list.choice_application')}</option>
                    {applications?.map((application: Application, index: number) => (
                        <option key={index} value={application.id}>
                            {application.appname}
                        </option>
                    ))}
                </select>
                <p>{errors.appId?.message}</p>
            </div>
            <div className="form-group">
                <label>{t('permissions.list.role')}</label>
                <select {...register('roleId')} className="form-select">
                    <option value="">{t('permissions.list.choice_role')}</option>
                    {roles?.map((role: Role, index: number) => (
                        <option key={index} value={role.id}>
                            {role.denomination}
                        </option>
                    ))}
                </select>
                <p>{errors.roleId?.message}</p>
            </div>
            <input className={styles.button} type="submit" value={t('permissions.add.add_button')} />
            <button className={styles.button_cancel} onClick={() => setIsFormCreate(false)}>
                {t('common.cancel')}
            </button>
        </form>
    );
};
