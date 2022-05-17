import axios from 'axios';
import AddPermissionDTO from '../types/dto/permission/addPermissionDTO';
import PermissionDTO from '../types/dto/permission/permissionDTO';
import UpdatePermissionDTO from '../types/dto/permission/updatePermission';
import Permission from '../types/models/permission/permission';
import Role from '../types/models/role/role';

const getAll = async (): Promise<PermissionDTO[]> => {
    const { data } = await axios.get('api/permission');

    return data;
};

const get = async (id: number): Promise<Permission> => {
    const { data } = await axios.get(`api/permission/${id}`);

    return data;
};

const getRoles = async (): Promise<Role[]> => {
    const { data } = await axios.get('api/role');
    return data;
};

const update = (id: number, data: UpdatePermissionDTO) => {
    return axios.patch(`api/permission/${id}`, { id_app: data.appId, id_role: data.roleId });
};

const save = (data: AddPermissionDTO) => {
    return axios.post('api/permission', {
        id_user: data.userId,
        id_role: data.roleId,
        id_app: data.appId,
    });
};

const _delete = (id: number) => {
    return axios.delete(`api/permission/${id}`);
};

export const permissionRepository = {
    getAll,
    get,
    getRoles,
    update,
    save,
    _delete,
};
