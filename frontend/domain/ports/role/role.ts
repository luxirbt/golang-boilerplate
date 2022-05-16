import Role from '../../models/role/role';

export default interface RoleRepository {
    getRoles(): Promise<Role[]>;
}
