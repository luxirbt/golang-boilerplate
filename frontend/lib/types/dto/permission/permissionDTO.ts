export default class PermissionDTO {
    ID: number;
    username: string;
    app_name: string;
    display_name: string;
    app_id: number;
    role: string;
    role_id: number;

    constructor(ID = 0, username = '', app_name = '', display_name: '', app_id = 0, role = '', role_id = 0) {
        this.ID = ID;
        this.username = username;
        this.app_name = app_name;
        this.display_name = display_name;
        this.role = role;
        this.app_id = app_id;
        this.role_id = role_id;
    }
}
