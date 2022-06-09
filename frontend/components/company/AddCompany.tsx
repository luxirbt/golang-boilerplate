import React, { ReactElement, useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AppContext } from '../../context/AppContext';
import useCompanyData from './CompanyDataHook';
import { useTranslation } from 'react-i18next';

type Inputs = {
    name: string;
};

export default function AddCompany(): ReactElement {
    const { t } = useTranslation();
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
                <label>{t('company.list.name')}</label>
                <input {...register('name', { required: true })} className="form-control" />
                {errors.name && <span>This field is required</span>}
            </div>
            <div className="mt-3">
                <input className="btn btn-primary me-1" type="submit" value={t('company.add.add_button')} />
                <button className="btn btn-danger text-nowrap" onClick={() => setIsFormCreate(false)}>
                    {t('common.cancel')}
                </button>
            </div>
        </form>
    );
}
