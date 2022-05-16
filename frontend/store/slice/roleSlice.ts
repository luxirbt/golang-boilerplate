import { createSlice } from '@reduxjs/toolkit';
import role from '../../domain/models/role/role';
import { fetchAll } from '../action/roleAction';

const roles = createSlice({
    name: 'roles',
    initialState: {
        entities: [] as role[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAll.fulfilled, (state, action) => {
            state.entities = action.payload;
        });
    },
});

export default roles;
