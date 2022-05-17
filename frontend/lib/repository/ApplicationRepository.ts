import axios from 'axios';
import ApplicationDTO from '../types/dto/application/applicationDTO';
import UpdateApplicationDTO from '../types/dto/application/updateApplicationDTO';
import Application from '../types/models/application/application';

const getAll = async (): Promise<Application[]> => {
    const { data } = await axios.get('api/application');
    return data;
};

const get = async (id: number): Promise<Application> => {
    const { data } = await axios.get(`api/application/${id}`);
    return data;
};

const save = (data: ApplicationDTO) => {
    const formData = new FormData();
    data.svg_light && formData.append('filelight', data.svg_light[0]);
    data.svg_dark && formData.append('filedark', data.svg_dark[0]);
    formData.append('appname', data.appname);
    formData.append('url', data.url);
    formData.append('displayname', data.displayname);
    data.webapp ? formData.append('webapp', '1') : formData.append('webapp', '0');
    return axios.post(`api/application`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const updateApplication = (id: number, data: UpdateApplicationDTO) => {
    return axios.put(`api/application/${id}`, { appname: data.appname, url: data.url });
};

export const applicationRepository = {
    getAll,
    get,
    save,
    updateApplication,
};
