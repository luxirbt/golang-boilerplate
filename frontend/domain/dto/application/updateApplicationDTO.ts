export default class UpdateApplicationDTO {
    id: number;
    url: string;

    constructor(id = 0, url = '') {
        this.id = id;
        this.url = url;
    }
}
