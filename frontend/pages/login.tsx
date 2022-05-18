import React, { ChangeEvent } from 'react';
import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import { useAlert } from 'react-alert';
import styles from '../styles/login.module.scss';
import { login } from '../lib/repository/AuthRepository';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import UserLogo from '../public/images/login.svg';

function Login(): ReactElement {
    const router = useRouter();
    const [state, setState] = useState({ username: '', password: '', appname: 'login' });
    const [errors, setErrors] = useState({ username: '', password: '' });
    const { t } = useTranslation();

    const alert = useAlert();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const Login = async () => {
        try {
            const { data } = await login(state.username, state.password, state.appname);
            if (data.Connect) {
                router.push('/');
            }
        } catch (err) {
            alert.error('username or password incorrect');
        }
    };

    const validation = () => {
        const errors = { username: '', password: '' };
        let formIsValid = true;

        if (!state.username) {
            errors.username = t('login.errors.username');
            formIsValid = false;
        }

        if (!state.password) {
            errors.password = t('login.errors.password');
            formIsValid = false;
        }

        setErrors(errors);
        return formIsValid;
    };

    const submit = () => {
        if (validation()) {
            Login();
        }
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className={styles.user_card}>
                    <div className={`d-flex justify-content-center ${styles.form_container}`}>
                        <form noValidate>
                            <div className="d-flex justify-content-center mb-5">
                                <Image src={UserLogo} alt="user-logo" />
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    id="username"
                                    data-test="username-input"
                                    className={`form-control ${styles.input_user}`}
                                    placeholder={t('login.username')}
                                    onChange={handleChange}
                                    value={state.username}
                                />
                                <div className={styles.error}> {errors.username}</div>
                            </div>
                            <div className="input-group mb-2">
                                <input
                                    type="password"
                                    id="password"
                                    data-test="pw-input"
                                    className={`form-control ${styles.input_pass}`}
                                    placeholder={t('login.password')}
                                    onChange={handleChange}
                                    value={state.password}
                                />
                                <div className={styles.error}> {errors.password}</div>
                            </div>
                            <div className={`d-flex justify-content-center mt-3 ${styles.login_container}`}>
                                <button
                                    data-test="submit"
                                    type="button"
                                    name="button"
                                    className={`btn ${styles.login_btn}`}
                                    onClick={submit}
                                >
                                    {t('login.submit')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
