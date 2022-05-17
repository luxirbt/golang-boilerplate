import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import styles from '../../styles/Permission.module.scss';
import { AppContext } from '../../context/AppContext';
import useDisplayForm from '../common/hook/DisplayFormHook';
import usePermissionData from './PermissionDataHook';
import Application from '../../lib/types/models/application/application';
import Role from '../../lib/types/models/role/role';
import { SubmitHandler, useForm } from 'react-hook-form';
import UpdatePermissionDTO from '../../lib/types/dto/permission/updatePermission';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface IUpdatePermission {
    permissionId: number;
    setPermissionId: Dispatch<SetStateAction<number>>;
    applications: Application[];
    roles: Role[];
}

const schema = yup
    .object({
        appId: yup.number().required().positive(),
        roleId: yup.number().required().positive(),
    })
    .required();

export const UpdatePermis = ({ permissionId, setPermissionId, applications, roles }: IUpdatePermission) => {
    const { setIsFormUpdate } = useContext(AppContext);

    const { handleBackToMenu } = useDisplayForm();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UpdatePermissionDTO>({ resolver: yupResolver(schema) });
    const { useFetchPermission, useUpdatePermission, useDeletePermission } = usePermissionData();
    const { data: permission } = useFetchPermission(permissionId);
    const { mutate } = useUpdatePermission(permissionId);
    const { mutate: mutateDelete } = useDeletePermission(permissionId);

    useEffect(() => {
        if (permission) {
            setValue('appId', permission.id_app);
            setValue('roleId', permission.id_role);
        }
    }, [permission, setValue]);

    const submit: SubmitHandler<UpdatePermissionDTO> = (data) => {
        mutate({
            appId: data.appId,
            roleId: data.roleId,
        });
    };

    const handleDelete = () => {
        mutateDelete();
    };

    return (
        <div className={styles.Container_Formulaire}>
            <button className={styles.Button_Cancel} onClick={() => handleBackToMenu(setPermissionId, setIsFormUpdate)}>
                Retour
            </button>

            <form onSubmit={handleSubmit(submit)}>
                <div className="u-form-group">
                    <select {...register('appId')} className={styles.Input_Formulaire}>
                        <option value="">--Please choose an application--</option>
                        {applications?.map((application: Application, index: number) => (
                            <option key={index} value={application.id} selected={permission?.id_app === application.id}>
                                {application.appname}
                            </option>
                        ))}
                    </select>
                    <p>{errors.appId?.message}</p>

                    <select {...register('roleId')} className={styles.Input_Formulaire}>
                        <option value="">--Please choose a role--</option>
                        {roles?.map((role: Role, index: number) => (
                            <option key={index} value={role.id} selected={permission?.id_role === role.id}>
                                {role.denomination}
                            </option>
                        ))}
                    </select>
                    <p>{errors.roleId?.message}</p>
                </div>
                <button className={styles.Button_Update_Permission}> update </button>
            </form>

            <form onSubmit={handleSubmit(handleDelete)}>
                <button className={styles.Button_Delete_Permission}> Supprimer </button>
            </form>
        </div>
    );
};
