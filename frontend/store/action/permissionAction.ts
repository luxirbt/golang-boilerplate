import { createAsyncThunk } from '@reduxjs/toolkit';
import PermissionController from '../../infra/controllers/permission/PermissionController';

export const fetchAll = createAsyncThunk('permissions/fetchAll', async () => {
    return await PermissionController.getAllPermissions();
});

export const fetchById = createAsyncThunk('permissions/fetchById', async (id: number) => {
    return await PermissionController.getPermission(id);
});
