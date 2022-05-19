export default class UpdateUserDTO {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    id_company: number;
    is_active: number;

    constructor(firstname = '', lastname = '', username = '', email = '', id_company = 0, is_active = 0) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.id_company = id_company;
        this.is_active = is_active;
    }
}
