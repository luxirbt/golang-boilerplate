import { createSlice } from '@reduxjs/toolkit';
import User from '../../domain/models/user/user';
import { fetchAll, fetchByUserId } from '../action/userAction';

const users = createSlice({
    name: 'users',
    initialState: {
        entities: [] as never,
        isLoading: true,
        entity: {} as User,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAll.fulfilled, (state, action) => {
            state.entities = action.payload as never;
            state.isLoading = false;
        });

        builder.addCase(fetchByUserId.fulfilled, (state, action) => {
            state.entity = action.payload;
            state.isLoading = false;
        });
    },
});

export default users;
