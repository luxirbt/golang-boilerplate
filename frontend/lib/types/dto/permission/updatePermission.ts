export default class UpdatePermissionDTO {
    appId: number;
    roleId: number;

    constructor(appId = 0, roleId = 0) {
        this.appId = appId;
        this.roleId = roleId;
    }
}
