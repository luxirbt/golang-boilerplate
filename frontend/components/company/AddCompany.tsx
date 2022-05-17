import React, { ReactElement, useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AppContext } from '../../context/AppContext';
import useCompanyData from './CompanyDataHook';

type Inputs = {
    name: string;
};

export default function AddCompany(): ReactElement {
    const { setIsFormCreate } = useContext(AppContext);

    const { useAddCompanyData } = useCompanyData();
    const { mutate } = useAddCompanyData();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutate(data.name);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
            <div className="form-group">
                <label>Company name</label>
                <input {...register('name', { required: true })} className="form-control" />
                {errors.name && <span>This field is required</span>}
            </div>
            <input type="submit" />
            <button onClick={() => setIsFormCreate(false)}>cancel</button>
        </form>
    );
}
