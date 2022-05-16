import React, { useState, FormEvent, useContext } from 'react';
import AddPermissionController from '../../infra/controllers/permission/PermissionController';
import User from '../../domain/models/user/user';
import Application from '../../domain/models/application/application';
import styles from '../../styles/Permission.module.scss';
import Role from '../../domain/models/role/role';
import { useAlert } from 'react-alert';
import { useAppDispatch } from '../../store/store';
import { fetchAll as fetchPermission } from '../../store/action/permissionAction';
import role from '../../domain/models/role/role';
import { AppContext } from '../../context/AppContext';
import AddPermissionDTO from '../../domain/dto/permission/addPermissionDTO';

interface PermissionFormProps {
    users: User[];
    applications: Application[];
    roles: role[];
}

export const Create = ({ users, applications, roles }: PermissionFormProps) => {
    const [userId, setUserId] = useState<number>(0);
    const [roleId, setRoleId] = useState<number>(0);
    const [appId, setAppId] = useState<number>(0);
    const alert = useAlert();
    const { setIsFormCreate } = useContext(AppContext);

    const dispatch = useAppDispatch();

    const addPermission = async () => {
        const data = { userId, roleId, appId } as AddPermissionDTO;
        AddPermissionController.addPermission(data)
            .then(() => {
                alert.success('La permission a été créée avec succès');
                dispatch(fetchPermission());
            })
            .catch(() => alert.error('La création de la permission a échoué'));
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        addPermission();
        setIsFormCreate(false);
    };

    return (
        <div className={styles.Container_Formulaire}>
            <button className={styles.Button_Cancel_Permission} onClick={() => setIsFormCreate(false)}>
                Cancel
            </button>

            <form onSubmit={submit}>
                <div>
                    <select
                        className={styles.Input_Formulaire}
                        onChange={(e) => setUserId(parseInt(e.target.value))}
                        required
                    >
                        <option value="">--Please choose an user--</option>
                        {users?.map((user: User, index: number) => (
                            <option key={index} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select
                        className={styles.Input_Formulaire}
                        onChange={(e) => setAppId(parseInt(e.target.value))}
                        required
                    >
                        <option value="">--Please choose an application--</option>
                        {applications?.map((application: Application, index: number) => (
                            <option key={index} value={application.id}>
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
                            <option key={index} value={role.id}>
                                {role.denomination}
                            </option>
                        ))}
                    </select>
                </div>
                <button className={styles.Button_Create_Permission}>Add permission</button>
            </form>
        </div>
    );
};
