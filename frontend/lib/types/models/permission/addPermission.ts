export default class AddPermission {
    userId: number;
    username: string;
    app_name: string;
    role: string;
    roleId: number;
    appId: number;

    constructor(userId = 0, username = '', app_name = '', role = '', roleId = 0, appId = 0) {
        this.userId = userId;
        this.username = username;
        this.app_name = app_name;
        this.role = role;
        this.roleId = roleId;
        this.appId = appId;
    }
}
