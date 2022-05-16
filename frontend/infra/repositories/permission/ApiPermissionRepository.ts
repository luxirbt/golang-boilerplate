import PermissionRepository from '../../../domain/ports/permission/permission';
import axios from 'axios';
import UpdatePermissionDTO from '../../../domain/dto/permission/updatePermission';
import AddPermissionDTO from '../../../domain/dto/permission/addPermissionDTO';
import PermissionDTO from '../../../domain/dto/permission/permissionDTO';
import Permission from '../../../domain/models/permission/permission';

export default class ApiPermissionRepository implements PermissionRepository {
    async getPermissions(): Promise<PermissionDTO[]> {
        const { data } = await axios.get('api/permission');

        return data;
    }

    async getPermission(id: number): Promise<Permission> {
        const { data } = await axios.get(`api/permission/${id}`);

        return data;
    }

    async updatePermission(id: number, data: UpdatePermissionDTO): Promise<UpdatePermissionDTO> {
        const res = await axios.patch(`api/permission/${id}`, { id_app: data.appId, id_role: data.roleId });
        return res.data;
    }
    async delete(id: number): Promise<void> {
        const { data } = await axios.delete(`api/permission/${id}`);

        return data;
    }
    async save(data: AddPermissionDTO): Promise<void> {
        const res = await axios.post('api/permission', {
            id_user: data.userId,
            id_role: data.roleId,
            id_app: data.appId,
        });
        return res.data;
    }
}
