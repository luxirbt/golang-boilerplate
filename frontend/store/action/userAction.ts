import { createAsyncThunk } from '@reduxjs/toolkit';
import UserController from '../../infra/controllers/user/UserController';

export const fetchAll = createAsyncThunk('users/fetchAll', async () => {
    return await UserController.getAllUsers();
});

export const fetchByUserId = createAsyncThunk('users/fetchByUserId', async (id: number) => {
    console.log(id);
    return await UserController.getUser(id);
});
