import Role from '../../../domain/models/role/role';
import { getRolesList } from '../../../app/role/role';
import ApiRoleRepository from '../../repositories/role/ApiRoleRepository';

const api = new ApiRoleRepository();

export default class RoleController {
    static async getAllRoles(): Promise<Role[]> {
        return getRolesList(api);
    }
}
