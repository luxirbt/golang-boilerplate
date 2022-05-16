export default class AddUserDTO {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    is_active: number;
    id_company: number;

    constructor(firstname = '', lastname = '', username = '', email = '', password: '', is_active = 0, id_company = 0) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.is_active = is_active;
        this.id_company = id_company;
    }
}
