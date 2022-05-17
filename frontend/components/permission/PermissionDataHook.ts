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

const usePermissionData = () => {
    const { setIsFormCreate } = useContext(AppContext);

    const alert = useAlert();

    const useFetchPermissions = () => {
        return useQuery<PermissionDTO[], Error>('permissions', permissionRepository.getAll);
    };

    const useFetchPermission = (id: number) => {
        return useQuery<Permission, Error>('permission', () => permissionRepository.get(id));
    };

    const useFetchRoles = () => {
        return useQuery<Role[], Error>('roles', () => permissionRepository.getRoles());
    };

    const useAddPermission = () => {
        return useMutation(permissionRepository.save, {
            onSuccess: () => {
                alert.success('Permission ajoutée');
                setIsFormCreate(false);
                queryClient.invalidateQueries('permissions');
            },
            onError: () => {
                alert.error('error');
            },
        });
    };

    const useUpdatePermission = (id: number) => {
        return useMutation((data: UpdatePermissionDTO) => permissionRepository.update(id, data), {
            onSuccess: () => {
                alert.success('User modifié');
                queryClient.invalidateQueries('permissions');
            },
            onError: () => {
                alert.error('error');
            },
        });
    };

    const useDeletePermission = (id: number) => {
        return useMutation(() => permissionRepository._delete(id), {
            onSuccess: () => {
                alert.success('User supprimé');
                queryClient.invalidateQueries('permissions');
            },
            onError: () => {
                alert.error('error');
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
