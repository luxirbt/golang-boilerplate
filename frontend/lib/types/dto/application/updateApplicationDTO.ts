export default class UpdateApplicationDTO {
    appname: string;
    url: string;
    displayname: string;
    webapp: boolean;
    svg_light: FileList | null;
    svg_dark: FileList | null;

    constructor(appname = '', url = '', displayname = '', webapp = false, svg_light = null, svg_dark = null) {
        this.appname = appname;
        this.url = url;
        this.displayname = displayname;
        this.webapp = webapp;
        this.svg_light = svg_light;
        this.svg_dark = svg_dark;
    }
}
