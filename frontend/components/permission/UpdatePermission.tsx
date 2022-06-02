import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import usePermissionData from './PermissionDataHook';
import Application from '../../lib/types/models/application/application';
import Role from '../../lib/types/models/role/role';
import { SubmitHandler, useForm } from 'react-hook-form';
import UpdatePermissionDTO from '../../lib/types/dto/permission/updatePermission';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from '../../styles/button.module.scss';
import { useTranslation } from 'react-i18next';
import Permission from '../../lib/types/models/permission/permission';
import { Console } from 'console';

interface IUpdatePermission {
    permission: Permission;
    setPermission: Dispatch<SetStateAction<Permission>>;
    applications: Application[] | undefined;
    roles: Role[] | undefined;
}

const schema = yup
    .object({
        appId: yup.number().required().positive(),
        roleId: yup.number().required().positive(),
    })
    .required();

export const UpdatePermission = ({ permission, setPermission, applications, roles }: IUpdatePermission) => {
    const { t } = useTranslation();
    const { setIsFormUpdate } = useContext(AppContext);

    // const { handleBackToMenu } = useDisplayForm();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UpdatePermissionDTO>({ resolver: yupResolver(schema) });

    const { useUpdatePermission, useDeletePermission } = usePermissionData();
    const { mutate } = useUpdatePermission(permission.ID);
    const { mutate: mutateDelete } = useDeletePermission(permission.ID);

    useEffect(() => {
        if (permission) {
            setValue('appId', permission.app_id);
            setValue('roleId', permission.role_id);
        }
    }, [permission, setValue]);

    const submit: SubmitHandler<UpdatePermissionDTO> = (data) => {
        mutate({
            appId: data.appId,
            roleId: data.roleId,
        });
    };

    const handleBackToMenu = () => {
        setIsFormUpdate(false);

        setPermission({ ID: 0, id_user: 0, id_app: 0, id_role: 0 });
    };

    const handleDelete = () => {
        mutateDelete();
    };

    console.log(permission);

    return (
        <>
            <form onSubmit={handleSubmit(submit)} className="d-flex flex-column">
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
                <input className={styles.button} type="submit" value={t('permissions.update.button_update')} />
            </form>
            <form onSubmit={handleSubmit(handleDelete)} className="d-flex flex-column">
                <input className={styles.button_cancel} type="submit" value={t('permissions.delete.delete_button')} />
                <button className={styles.button_cancel} onClick={handleBackToMenu}>
                    {t('common.cancel')}
                </button>
            </form>
        </>
    );
};
