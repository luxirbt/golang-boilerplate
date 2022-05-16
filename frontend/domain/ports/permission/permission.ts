import AddPermissionDTO from '../../dto/permission/addPermissionDTO';
import PermissionDTO from '../../dto/permission/permissionDTO';
import UpdatePermissionDTO from '../../dto/permission/updatePermission';
import Permission from '../../models/permission/permission';

export default interface PermissionRepository {
    getPermissions(): Promise<PermissionDTO[]>;
    getPermission(id: number): Promise<Permission>;
    updatePermission(id: number, data: UpdatePermissionDTO): Promise<UpdatePermissionDTO>;
    save(data: AddPermissionDTO): Promise<void>;
    delete(id: number): Promise<void>;
}
