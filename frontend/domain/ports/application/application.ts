import Application from '../../models/application/application';

export default interface ApplicationRepository {
    getAll(): Promise<Application[]>;
    get(id: number): Promise<Application>;
    save(appname: string, url: string, displayname: string, webapp: boolean): Promise<Application>;
    saveSvg(svg_light: string, svg_dark: string, id_application: number): Promise<Application>;
    updateApplication(id: number, appname: string, url: string): Promise<Application>;
}
