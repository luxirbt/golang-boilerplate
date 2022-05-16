import axios from 'axios';
import Role from '../../../domain/models/role/role';
import RoleRepository from '../../../domain/ports/role/role';

export default class ApiRoleRepository implements RoleRepository {
    async getRoles(): Promise<Role[]> {
        const { data } = await axios.get('api/role');
        return data;
    }
}
