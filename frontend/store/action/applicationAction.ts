import { createAsyncThunk } from '@reduxjs/toolkit';
import Application from '../../domain/models/application/application';
import ApplicationDTO from '../../domain/dto/applicationDTO';
import ApplicationController from '../../infra/controllers/application/ApplicationController';

export const fetchAll = createAsyncThunk<Application[], void>('application/fetchAll', async () => {
    return await ApplicationController.getAll();
});

export const fetchById = createAsyncThunk<Application, number>('application/fetchById', async (id) => {
    return await ApplicationController.get(id);
});

export const createApplication = createAsyncThunk<Application, ApplicationDTO>(
    'application/create',
    async ({ appname, url, displayname, webapp }) => {
        return await ApplicationController.addApplication(appname, url, displayname, webapp);
    },
);

export const createSvg = createAsyncThunk<Application, ApplicationDTO>(
    'svg/create',
    async ({ svg_light, svg_dark, id_application }) => {
        return await ApplicationController.addSvg(svg_light, svg_dark, id_application);
    },
);

export const updateApplication = createAsyncThunk<Application, Application>(
    'application/update',
    async ({ id, appname, url }) => {
        return await ApplicationController.updateApplication(id, appname, url);
    },
);
