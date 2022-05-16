import {
    getPermissionsList,
    updatePermission,
    addPermission,
    deletePermission,
    getPermission,
} from '../../../app/permission/permission';
import ApiPermissionRepository from '../../repositories/permission/ApiPermissionRepository';
import UpdatePermissionDTO from '../../../domain/dto/permission/updatePermission';
import AddPermissionDTO from '../../../domain/dto/permission/addPermissionDTO';
import PermissionDTO from '../../../domain/dto/permission/permissionDTO';
import Permission from '../../../domain/models/permission/permission';

const api = new ApiPermissionRepository();

export default class PermissionController {
    static async getAllPermissions(): Promise<PermissionDTO[]> {
        return getPermissionsList(api);
    }

    static async getPermission(id: number): Promise<Permission> {
        return getPermission(api, id);
    }

    static async updatePermission(id: number, data: UpdatePermissionDTO): Promise<UpdatePermissionDTO> {
        return updatePermission(api, id, data);
    }

    static async addPermission(data: AddPermissionDTO): Promise<void> {
        return addPermission(api, data);
    }

    static async deletePermission(id: number): Promise<void> {
        return deletePermission(api, id);
    }
}
