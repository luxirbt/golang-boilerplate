import { createAsyncThunk } from '@reduxjs/toolkit';
import role from '../../domain/models/role/role';
import RoleController from '../../infra/controllers/role/RoleController';

export const fetchAll = createAsyncThunk<role[], void>('role/fetchAll', async () => {
    return await RoleController.getAllRoles();
});
