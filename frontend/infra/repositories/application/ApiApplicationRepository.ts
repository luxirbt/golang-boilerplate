import axios from 'axios';
import Application from '../../../domain/models/application/application';
import ApplicationRepository from '../../../domain/ports/application/application';

export default class ApiApplicationRepository implements ApplicationRepository {
    async getAll(): Promise<Application[]> {
        const { data } = await axios.get('api/application');
        return data;
    }

    async get(id: number): Promise<Application> {
        const { data } = await axios.get(`api/application/${id}`);
        return data;
    }

    async save(appname: string, url: string, displayname: string, webapp: boolean): Promise<Application> {
        const { data } = await axios.post(`api/application`, { appname, url, displayname, webapp });
        return data;
    }

    async saveSvg(svg_light: string, svg_dark: string, id_application: number): Promise<Application> {
        const { data } = await axios.post(`api/application/svg`, { svg_light, svg_dark, id_application });
        return data;
    }

    async updateApplication(id: number, appname: string, url: string): Promise<Application> {
        const { data } = await axios.put(`api/application/${id}`, { appname, url });
        return data;
    }
}
