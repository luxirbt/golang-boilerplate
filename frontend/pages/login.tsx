import React from 'react';
import { ReactElement, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useAlert } from 'react-alert';
import styles from '../styles/login.module.scss';
import { login } from '../lib/repository/AuthRepository';
// import Account_login from '../assets/Account_login.png';
// import Image from 'next/image';

function Login(): ReactElement {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();
    const alert = useAlert();
    const Login = async () => {
        try {
            const usrs = await login(username, password, 'login');
            if (usrs.data.Connect) {
                router.replace('/user');
            }
        } catch (err) {
            alert.error('Username or password invalid');
        }
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        Login();
    };

    return (
        <div className={styles.Login_Container}>
            <form onSubmit={submit}>
                <div className={styles.Account_Logo}>{/* <Image src={Account_login} /> */}</div>
                <>
                    <input
                        placeholder="User name"
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.Login_Input1}
                    />
                </>

                <>
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.Login_Input2}
                    />
                </>
                <button className={styles.Login_Button} type="submit">
                    Sign in
                </button>
            </form>
        </div>
    );
}

export default Login;
