import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import users from './slice/userSlice';
import companies from './slice/companySlice';
import applications from './slice/applicationSlice';
import permissions from './slice/permissionSlice';
import roles from './slice/roleSlice';

const reducer = combineReducers({
    users: users.reducer,
    companies: companies.reducer,
    applications: applications.reducer,
    permissions: permissions.reducer,
    roles: roles.reducer,
});

const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
