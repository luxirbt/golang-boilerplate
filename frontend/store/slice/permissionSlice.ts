import { createSlice } from '@reduxjs/toolkit';
import PermissionDTO from '../../domain/dto/permission/permissionDTO';
import Permission from '../../domain/models/permission/permission';
import { fetchAll, fetchById } from '../action/permissionAction';

const permissions = createSlice({
    name: 'permissions',
    initialState: {
        entities: [] as PermissionDTO[],
        entity: {} as Permission,
        isLoading: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAll.fulfilled, (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        });

        builder.addCase(fetchById.fulfilled, (state, action) => {
            state.entity = action.payload;
            state.isLoading = false;
        });
    },
});

export default permissions;
