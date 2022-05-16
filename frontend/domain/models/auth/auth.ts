export class Auth {
    username: string;
    password: string;
    appname: string;

    constructor(username = '', password = '', appname = '') {
        this.username = username;
        this.password = password;
        this.appname = appname;
    }
}

interface AuthResponseBody {
    Connect: boolean;
    AccessToken: string;
    IDUser: number;
    Role: string;
    Username: string;
}

export class AuthResponse {
    data: AuthResponseBody;

    constructor(data = { Connect: false, AccessToken: '', IDUser: 0, Role: '', Username: '' }) {
        this.data = data;
    }
}
