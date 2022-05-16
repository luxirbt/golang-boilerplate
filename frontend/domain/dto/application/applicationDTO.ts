export default class ApplicationDTO {
    appname: string;
    url: string;
    displayname: string;
    webapp: boolean;
    svg_light: string;
    svg_dark: string;
    id_application: number;

    constructor(appname = '', url = '', displayname = '', webapp = false, svg_light = '', svg_dark = '', id_application = 0) {
        this.appname = appname;
        this.url = url;
        this.displayname = displayname;
        this.webapp = webapp;
        this.svg_light = svg_light;
        this.svg_dark = svg_dark
        this.id_application = id_application
    }
}
