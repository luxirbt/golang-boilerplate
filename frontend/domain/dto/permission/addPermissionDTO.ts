export default class AddPermissionDTO {
    userId: number;
    appId: number;
    roleId: number;

    constructor(userId = 0, appId = 0, roleId = 0) {
        this.userId = userId;
        this.appId = appId;
        this.roleId = roleId;
    }
}
