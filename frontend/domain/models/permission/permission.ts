export default class Permission {
    ID: number;
    id_user: number;
    id_app: number;
    id_role: number;

    constructor(ID = 0, id_user = 0, id_app = 0, id_role = 0) {
        this.ID = ID;
        this.id_user = id_user;
        this.id_app = id_app;
        this.id_role = id_role;
    }
}
