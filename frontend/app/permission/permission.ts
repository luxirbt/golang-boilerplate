import AddPermissionDTO from '../../domain/dto/permission/addPermissionDTO';
import PermissionDTO from '../../domain/dto/permission/permissionDTO';
import UpdatePermissionDTO from '../../domain/dto/permission/updatePermission';
import Permission from '../../domain/models/permission/permission';
import PermissionRepository from '../../domain/ports/permission/permission';

export async function getPermissionsList(permissionRepository: PermissionRepository): Promise<PermissionDTO[]> {
    return await permissionRepository.getPermissions();
}

export async function getPermission(permissionRepository: PermissionRepository, id: number): Promise<Permission> {
    return await permissionRepository.getPermission(id);
}

export async function updatePermission(
    permissionRepository: PermissionRepository,
    id: number,
    data: UpdatePermissionDTO,
): Promise<UpdatePermissionDTO> {
    return await permissionRepository.updatePermission(id, data);
}

export async function addPermission(permissionRepository: PermissionRepository, data: AddPermissionDTO): Promise<void> {
    await permissionRepository.save(data);
}

export async function deletePermission(permissionRepository: PermissionRepository, ID: number): Promise<void> {
    return await permissionRepository.delete(ID);
}
