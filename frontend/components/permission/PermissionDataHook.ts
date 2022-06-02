import { useAlert } from 'react-alert';
import { useMutation, useQuery } from 'react-query';
import PermissionDTO from '../../lib/types/dto/permission/permissionDTO';
import { permissionRepository } from '../../lib/repository/PermissionRepository';
import { queryClient } from '../../pages/_app';
import Role from '../../lib/types/models/role/role';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import UpdatePermissionDTO from '../../lib/types/dto/permission/updatePermission';
import Permission from '../../lib/types/models/permission/permission';
import { useTranslation } from 'react-i18next';
import { PermissionContext } from '../../context/PermissionContext';

const usePermissionData = () => {
    const { t } = useTranslation();
    const { setIsFormCreate, setIsFormUpdate } = useContext(AppContext);
    const { setPermission } = useContext(PermissionContext);

    const alert = useAlert();

    const useFetchPermissions = () => {
        return useQuery<PermissionDTO[], Error>('permissions', permissionRepository.getAll, {
            onError: (err) => {
                alert.error(`${t('common.error.loading')} : ${err}`);
            },
        });
    };

    const useFetchPermission = (id: number) => {
        return useQuery<Permission, Error>('permission', () => permissionRepository.get(id), {
            onError: (err) => {
                alert.error(`${t('common.error.loading')} : ${err}`);
            },
        });
    };

    const useFetchRoles = () => {
        return useQuery<Role[], Error>('roles', () => permissionRepository.getRoles(), {
            onError: (err) => {
                alert.error(`${t('common.error.loading')} : ${err}`);
            },
        });
    };

    const useAddPermission = () => {
        return useMutation(permissionRepository.save, {
            onSuccess: () => {
                alert.success(t('permissions.add.success'));
                setIsFormCreate(false);
                queryClient.invalidateQueries('permissions');
            },
            onError: (err) => {
                alert.error(`${t('permissions.add.error')} : ${err}`);
            },
        });
    };

    const useUpdatePermission = (id: number) => {
        return useMutation((data: UpdatePermissionDTO) => permissionRepository.update(id, data), {
            onSuccess: () => {
                alert.success(t('permissions.update.success'));
                setIsFormUpdate(false);
                setPermission({
                    ID: 0,
                    username: '',
                    app_name: '',
                    app_id: 0,
                    role: '',
                    role_id: 0,
                });
                queryClient.invalidateQueries('permissions');
            },
            onError: (err) => {
                alert.error(`${t('permissions.update.error')} : ${err}`);
            },
        });
    };

    const useDeletePermission = (id: number) => {
        return useMutation(() => permissionRepository._delete(id), {
            onSuccess: () => {
                alert.success(t('permissions.delete.success'));
                setIsFormUpdate(false);
                queryClient.invalidateQueries('permissions');
            },
            onError: (err) => {
                alert.error(`${t('permissions.delete.error')} : ${err}`);
            },
        });
    };

    return {
        useFetchPermissions,
        useFetchPermission,
        useFetchRoles,
        useAddPermission,
        useUpdatePermission,
        useDeletePermission,
    };
};

export default usePermissionData;
