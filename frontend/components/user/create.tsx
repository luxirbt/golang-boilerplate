import React, { ChangeEvent } from 'react';
import { useState, FormEvent, useContext } from 'react';
import UserController from '../../infra/controllers/user/UserController';
import generator from 'generate-password';
import { useAlert } from 'react-alert';
import styles from '../../styles/User.module.scss';
import { fetchAll as fetchUsers } from '../../store/action/userAction';
import { useAppDispatch } from '../../store/store';
import Company from '../../domain/models/company/company';
import { AppContext } from '../../context/AppContext';
import AddUserDTO from '../../domain/dto/user/addUserDTO';

interface Props {
    companies: Company[];
}

export const Create = ({ companies }: Props) => {
    const [fields, setFields] = useState<AddUserDTO>({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        is_active: 0,
        id_company: 0,
    });
    const { setIsFormCreate } = useContext(AppContext);
    const alert = useAlert();

    const dispatch = useAppDispatch();

    const createUser = async () => {
        UserController.addUser(fields)
            .then(async () => {
                setIsFormCreate(false);
                dispatch(fetchUsers());
                alert.success('User successfully added');
            })
            .catch(() => alert.error("Erreur dans la création de l'utilisateur"));
    };

    const generatePassword = () => {
        const pwd = generator.generate({
            length: 15,
        });
        setFields((prevState) => ({
            ...prevState,
            ['password']: pwd,
        }));
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        await createUser();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFields((prevState) => ({
            ...prevState,
            [name]: name === 'id_company' ? parseInt(value) : value,
        }));
    };

    return (
        <div className={styles.Container_Formulaire}>
            <button className={styles.Button_Cancel} onClick={() => setIsFormCreate(false)}>
                Cancel
            </button>

            <form onSubmit={submit}>
                <div>
                    <input
                        className={styles.Input_Formulaire}
                        placeholder="First name"
                        onChange={handleChange}
                        name="firstname"
                        required
                    />

                    <input
                        className={styles.Input_Formulaire}
                        placeholder="Last name"
                        onChange={handleChange}
                        name="lastname"
                        required
                    />

                    <input
                        className={styles.Input_Formulaire}
                        placeholder="User name"
                        onChange={handleChange}
                        name="username"
                        required
                    />

                    <input
                        className={styles.Input_Formulaire}
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        required
                    />

                    <input className={styles.Input_Formulaire} value={fields.password} required disabled />
                    <input
                        className={styles.Input_Formulaire}
                        type="button"
                        value="Generate"
                        onClick={generatePassword}
                    />

                    <select className={styles.Input_Formulaire} onChange={handleChange} name="id_company" required>
                        <option value="">--Please choose a company--</option>
                        {companies?.map((company, index: number) => (
                            <option key={index} value={company.id}>
                                {company.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button className={styles.Button_Create_User}>Add user</button>
            </form>
        </div>
    );
};
