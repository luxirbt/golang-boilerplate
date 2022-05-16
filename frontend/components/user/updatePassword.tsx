import * as React from 'react';
import { useState, FormEvent } from 'react';
import UserController from '../../infra/controllers/user/UserController';
import { useRouter } from 'next/router';
import { useAlert } from 'react-alert';

export const UpdatePwd = () => {
    const [password, setPassword] = useState<string>('');
    const { query } = useRouter();

    const alert = useAlert();

    const Update_Passwords = async () => {
        await UserController.updatePassword(parseInt(query.iduser as string), password);
        alert.success('Password successfully change');
    };

    const Invalid_Urls = async () => {
        await UserController.invalidUrl();
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        Update_Passwords();
        Invalid_Urls();
    };

    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={submit}>
                    <input placeholder="New Password" onChange={(e) => setPassword(e.target.value)} required />
                    <input placeholder="Retype New Password" />
                    <button type="submit">Save New Password</button>
                </form>
            </div>
        </div>
    );
};
