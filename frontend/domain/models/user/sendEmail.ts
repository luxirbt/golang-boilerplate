export default class SendEmail {
    id: number;
    email: string;

    constructor(id = 0, email = '') {
        this.id = id;
        this.email = email;
    }
}
