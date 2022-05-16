export default class User {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    company_name: string;
    password: string;
    is_active: number;
    id_company: number;
    [x: string]: string | number;

    constructor(
        id = 0,
        firstname = '',
        lastname = '',
        username = '',
        email = '',
        company_name = '',
        password = '',
        is_active = 0,
        id_company = 0,
    ) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.company_name = company_name;
        this.password = password;
        this.is_active = is_active;
        this.id_company = id_company;
    }
}
