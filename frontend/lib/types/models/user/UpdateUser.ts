export default class UpdateUser {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    is_active: number;
    id_company: number;

    constructor(
        id = 0,
        firstname = '',
        lastname = '',
        username = '',
        email = '',
        password: '',
        is_active = 0,
        id_company = 0,
    ) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.is_active = is_active;
        this.id_company = id_company;
    }
}
