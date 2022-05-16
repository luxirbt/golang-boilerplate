import { createSlice } from '@reduxjs/toolkit';
import Application from '../../domain/models/application/application';
import { createApplication, fetchById, updateApplication, createSvg } from '../action/applicationAction';
import { fetchAll } from '../action/applicationAction';

const applications = createSlice({
    name: 'applications',
    initialState: {
        entities: [] as Application[],
        entity: {} as Application,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAll.fulfilled, (state, action) => {
            state.entities = action.payload;
        });

        builder.addCase(fetchById.fulfilled, (state, action) => {
            state.entity = action.payload;
        });

        builder.addCase(createApplication.fulfilled, (state, action) => {
            state.entities.push(action.payload);
        });

        builder.addCase(createSvg.fulfilled, (state, action) => {
            state.entities.push(action.payload);
        });

        builder.addCase(updateApplication.fulfilled, (state, action) => {
            const index = state.entities.findIndex((application) => application.id === action.payload.id);
            state.entities[index] = {
                ...state.entities[index],
                ...action.payload,
            };
        });
    },
});

export default applications;
