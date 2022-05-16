import React, { Dispatch, SetStateAction, useCallback, useContext, useEffect } from 'react';
import { useState, FormEvent } from 'react';
import Application from '../../domain/models/application/application';
import Role from '../../domain/models/role/role';
import styles from '../../styles/Permission.module.scss';
import { useAlert } from 'react-alert';
import role from '../../domain/models/role/role';
import { AppContext } from '../../context/AppContext';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchById, fetchAll } from '../../store/action/permissionAction';
import PermissionController from '../../infra/controllers/permission/PermissionController';
import UpdatePermissionDTO from '../../domain/dto/permission/updatePermission';
import useDisplayForm from '../common/hook/DisplayFormHook';

interface IUpdatePermission {
    permissionId: number;
    setPermissionId: Dispatch<SetStateAction<number>>;
    applications: Application[];
    roles: role[];
}

export const UpdatePermis = ({ permissionId, setPermissionId, applications, roles }: IUpdatePermission) => {
    const [appId, setAppId] = useState<number>(0);
    const [roleId, setRoleId] = useState<number>(0);
    const alert = useAlert();
    const { setIsFormUpdate } = useContext(AppContext);

    const dispatch = useAppDispatch();
    const permission = useAppSelector((state) => state.permissions.entity);

    const { handleBackToMenu } = useDisplayForm();

    const updatePermission = async () => {
        const data = { appId, roleId } as UpdatePermissionDTO;
        PermissionController.updatePermission(permissionId, data)
            .then(() => {
                alert.success('Permission modifiée avec succès');
                setPermissionId(0);
                dispatch(fetchAll());
            })
            .catch(() => alert.error('La modification de la permission a échoué'));
    };

    const deletePermission = async () => {
        PermissionController.deletePermission(permissionId)
            .then(() => {
                alert.success('Permission supprimée avec succès');
                setPermissionId(0);
                dispatch(fetchAll());
            })
            .catch(() => alert.error('La suppression de la permission a échoué'));
    };

    const getPermission = useCallback(() => {
        dispatch(fetchById(permissionId));
    }, [permissionId, dispatch]);

    useEffect(() => {
        getPermission();
    }, [getPermission]);

    useEffect(() => {
        setAppId(permission.id_app);
        setRoleId(permission.id_role);
    }, [permission]);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        updatePermission();
        setIsFormUpdate(false);
    };

    const supprimer = async (e: FormEvent) => {
        e.preventDefault();
        deletePermission();
        setIsFormUpdate(false);
    };

    return (
        <div className={styles.Container_Formulaire}>
            <button className={styles.Button_Cancel} onClick={() => handleBackToMenu(setPermissionId, setIsFormUpdate)}>
                Retour
            </button>

            <form onSubmit={submit}>
                <div className="u-form-group">
                    <select
                        className={styles.Input_Formulaire}
                        onChange={(e) => setAppId(parseInt(e.target.value))}
                        required
                    >
                        <option value="">--Please choose an application--</option>
                        {applications?.map((application: Application, index: number) => (
                            <option key={index} value={application.id} selected={appId === application.id}>
                                {application.appname}
                            </option>
                        ))}
                    </select>
                    <select
                        className={styles.Input_Formulaire}
                        onChange={(e) => setRoleId(parseInt(e.target.value))}
                        required
                    >
                        <option value="">--Please choose a role--</option>
                        {roles?.map((role: Role, index: number) => (
                            <option key={index} value={role.id} selected={roleId === role.id}>
                                {role.denomination}
                            </option>
                        ))}
                    </select>
                </div>
                <button className={styles.Button_Update_Permission}> update </button>
            </form>
            <form onSubmit={supprimer}>
                <button className={styles.Button_Delete_Permission}> Supprimer </button>
            </form>
        </div>
    );
};
