import { createSlice } from '@reduxjs/toolkit';
import Company from '../../domain/models/company/company';
import { createCompany, fetchAll } from '../action/companyAction';

const companies = createSlice({
    name: 'companies',
    initialState: {
        entities: [] as Company[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAll.fulfilled, (state, action) => {
            state.entities = action.payload;
        });

        builder.addCase(createCompany.fulfilled, (state, action) => {
            state.entities.push(action.payload);
        });
    },
});

export default companies;
