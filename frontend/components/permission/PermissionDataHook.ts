import { useAlert } from 'react-alert';
import { useMutation, useQuery } from 'react-query';
import { permissionRepository } from '../../lib/repository/PermissionRepository';
import { queryClient } from '../../pages/_app';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import UpdatePermissionDTO from '../../lib/types/dto/permission/updatePermission';
import { useTranslation } from 'react-i18next';
import { PermissionContext } from '../../context/PermissionContext';

const usePermissionData = () => {
    const { t } = useTranslation();
    const { setIsFormCreate, setIsFormUpdate } = useContext(AppContext);
    const { setPermission } = useContext(PermissionContext);

    const alert = useAlert();

    const useFetchPermissions = () => {
        return useQuery('permissions', permissionRepository.getAll, {
            onError: ({ response }) => {
                alert.error(`${t('common.error.loading')} : ${response.data.reason}`);
            },
        });
    };

    const useFetchPermission = (id: number) => {
        return useQuery('permission', () => permissionRepository.get(id), {
            onError: ({ response }) => {
                alert.error(`${t('common.error.loading')} : ${response.data.reason}`);
            },
        });
    };

    const useFetchRoles = () => {
        return useQuery('roles', () => permissionRepository.getRoles(), {
            onError: ({ response }) => {
                alert.error(`${t('common.error.loading')} : ${response.data.reason}`);
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
            onError: ({ response }) => {
                alert.error(`${t('permissions.add.error')} : ${response.data.reason}`);
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
            onError: ({ response }) => {
                alert.error(`${t('permissions.update.error')} : ${response.data.reason}`);
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
            onError: ({ response }) => {
                alert.error(`${t('permissions.delete.error')} : ${response.data.reason}`);
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
