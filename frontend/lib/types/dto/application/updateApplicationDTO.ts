export default class UpdateApplicationDTO {
    appname: string;
    url: string;

    constructor(appname = '', url = '') {
        this.appname = appname;
        this.url = url;
    }
}
