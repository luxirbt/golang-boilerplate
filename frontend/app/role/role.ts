import Role from '../../domain/models/role/role';
import RoleRepository from '../../domain/ports/role/role';

export async function getRolesList(roleRepository: RoleRepository): Promise<Role[]> {
    return await roleRepository.getRoles();
}
