export default class UpdatePermissionDTO {
    id: number;
    appId: number;
    roleId: number;

    constructor(id = 0, appId = 0, roleId = 0) {
        this.id = id;
        this.appId = appId;
        this.roleId = roleId;
    }
}
