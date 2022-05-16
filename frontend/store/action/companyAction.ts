import { createAsyncThunk } from '@reduxjs/toolkit';
import Company from '../../domain/models/company/company';
import CompanyController from '../../infra/controllers/company/CompanyController';

export const fetchAll = createAsyncThunk('company/fetchAll', async () => {
    return await CompanyController.getAll();
});

export const createCompany = createAsyncThunk<Company, Company>('company/create', async ({ name }) => {
    return await CompanyController.addCompany(name);
});
