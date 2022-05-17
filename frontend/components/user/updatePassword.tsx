import React from 'react';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useAlert } from 'react-alert';
import { userRepository } from '../../lib/repository/UserRepository';

export const UpdatePwd = () => {
    const [password, setPassword] = useState<string>('');
    const [passwordRetyped, setPasswordRetyped] = useState<string>('');
    const { query } = useRouter();

    const alert = useAlert();

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (password === passwordRetyped) {
            userRepository
                .updatePassword(parseInt(query.iduser as string), password)
                .then(() => {
                    userRepository.invalidUrl().then(() => {
                        alert.success('Password changed successfully');
                    });
                })
                .catch(() => alert.error('Error when changing password'));
        } else {
            setPassword('');
            setPasswordRetyped('');
            alert.error('Passwords should be same');
        }
    };

    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={submit}>
                    <input placeholder="New Password" onChange={(e) => setPassword(e.target.value)} required />
                    <input
                        placeholder="Retype New Password"
                        onChange={(e) => setPasswordRetyped(e.target.value)}
                        required
                    />
                    <button type="submit">Save New Password</button>
                </form>
            </div>
        </div>
    );
};
