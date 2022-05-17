import React from 'react';
import { useState, useContext } from 'react';
import generator from 'generate-password';
import { AppContext } from '../../context/AppContext';
import AddUserDTO from '../../lib/types/dto/user/addUserDTO';
import { SubmitHandler, useForm } from 'react-hook-form';
import useUserData from './UserDataHook';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Company from '../../lib/types/models/company/company';

interface Props {
    companies: Company[];
}

const schema = yup
    .object({
        firstname: yup.string().required(),
        lastname: yup.string().required(),
        username: yup.string().required(),
        email: yup.string().email().required(),
        id_company: yup.number().required().positive(),
    })
    .required();

export const AddUser = ({ companies }: Props) => {
    const { setIsFormCreate } = useContext(AppContext);

    const [password, setPassword] = useState<string>('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddUserDTO>({ resolver: yupResolver(schema) });

    const generatePassword = () => {
        const pwd = generator.generate({
            length: 15,
        });
        setPassword(pwd);
    };

    const { useAddUser } = useUserData();
    const { mutate } = useAddUser();

    const submit: SubmitHandler<AddUserDTO> = (data) => {
        mutate({
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.lastname,
            email: data.email,
            password,
            is_active: 0,
            id_company: data.id_company,
        });
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="d-flex flex-column">
            <div className="form-group">
                <label>Firstname</label>
                <input {...register('firstname')} className="form-control" placeholder="Firstname" />
                <p>{errors.firstname?.message}</p>
            </div>

            <div className="form-group">
                <label>Firstname</label>
                <input {...register('lastname')} className="form-control" placeholder="Lastname" />
                <p>{errors.lastname?.message}</p>
            </div>
            <div className="form-group">
                <label>Firstname</label>
                <input {...register('username')} className="form-control" placeholder="Username" />
                <p>{errors.username?.message}</p>
            </div>
            <div className="form-group">
                <label>Firstname</label>
                <input {...register('email')} className="form-control" placeholder="Email" />
                <p>{errors.email?.message}</p>
            </div>
            <div className="form-group">
                <label>Firstname</label>
                <input className="form-control" value={password} required disabled />
                <input className="form-control" type="button" value="Generate" onClick={generatePassword} />
            </div>
            <div className="form-group">
                <label>Firstname</label>
                <select {...register('id_company')} className="form-select">
                    <option value="">--Please choose a company--</option>
                    {companies?.map((company, index: number) => (
                        <option key={index} value={company.id}>
                            {company.name}
                        </option>
                    ))}
                </select>
                <p>{errors.id_company?.message}</p>
            </div>
            <input type="submit" />
            <button onClick={() => setIsFormCreate(false)}>Cancel</button>
        </form>
    );
};
