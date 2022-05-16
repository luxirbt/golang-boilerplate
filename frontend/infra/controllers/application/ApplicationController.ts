import Application from '../../../domain/models/application/application';
import { getAll, get, addApplication, updateApplication, addSvg } from '../../../app/application/application';
import ApiApplicationRepository from '../../repositories/application/ApiApplicationRepository';

const api = new ApiApplicationRepository();

export default class ApplicationController {
    static async getAll(): Promise<Application[]> {
        return getAll(api);
    }

    static async get(id: number): Promise<Application> {
        return get(api, id);
    }

    static async addApplication(appname: string, url: string, displayname: string, webapp: boolean): Promise<Application> {
        return addApplication(api, appname, url, displayname, webapp);
    }

    static async updateApplication(ID: number, appname: string, url: string): Promise<Application> {
        return updateApplication(api, ID, appname, url);
    }

    static async addSvg(svg_light: string, svg_dark: string, id_application: number): Promise<Application> {
        return addSvg(api, svg_light, svg_dark, id_application);
    }
}
