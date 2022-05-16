export default class PermissionDTO {
    ID: number;
    username: string;
    app_name: string;
    role: string;

    constructor(ID = 0, username = '', app_name = '', role = '') {
        this.ID = ID;
        this.username = username;
        this.app_name = app_name;
        this.role = role;
    }
}
