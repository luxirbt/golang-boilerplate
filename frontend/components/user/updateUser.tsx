import React, { Dispatch, SetStateAction, useContext } from 'react';
import { useState, useEffect, FormEvent, useCallback, ChangeEvent } from 'react';
import UserController from '../../infra/controllers/user/UserController';
import styles from '../../styles/updateUser.module.scss';
import { useAlert } from 'react-alert';
import { fetchAll, fetchByUserId } from '../../store/action/userAction';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Company from '../../domain/models/company/company';
import User from '../../domain/models/user/user';
import { AppContext } from '../../context/AppContext';
import UpdateUserDTO from '../../domain/dto/user/updateUserDTO';
import useDisplayForm from '../common/hook/DisplayFormHook';

interface IUpdateUser {
    userId: number;
    setUserId: Dispatch<SetStateAction<number>>;
    companies: Company[];
}

export const UpdateUsr = ({ userId, setUserId, companies }: IUpdateUser) => {
    const { setIsFormUpdate } = useContext(AppContext);

    const [fields, setFields] = useState<UpdateUserDTO>({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        id_company: 0,
    });

    const { handleBackToMenu } = useDisplayForm();

    const alert = useAlert();

    const dispatch = useAppDispatch();
    const user: User = useAppSelector((state) => state.users.entity);

    const getUser = useCallback(async () => {
        dispatch(fetchByUserId(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    useEffect(() => {
        setFields(user);
    }, [user]);

    const updateUser = async () => {
        await UserController.updateUser(userId, fields)
            .then(() => {
                setUserId(0);
                setIsFormUpdate(false);
                dispatch(fetchAll());
                alert.success('User informations is updated');
            })
            .catch(() => {
                alert.error("L'utilisateur n'a pas pu être modifié");
            });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFields((prevState) => ({
            ...prevState,
            [name]: name === 'id_company' ? parseInt(value) : value,
        }));
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        updateUser();
    };

    return (
        <div className={styles.Container_Formulaire}>
            <button className={styles.Button_Cancel} onClick={() => handleBackToMenu(setUserId, setIsFormUpdate)}>
                cancel
            </button>

            <form onSubmit={submit}>
                <div>
                    <label className={styles.Tite_Input}>First name</label>
                    <input
                        className={styles.Input_Formulaire}
                        placeholder="First name"
                        defaultValue={fields.firstname}
                        onChange={handleChange}
                        name="firstname"
                        required
                    />
                    <label className={styles.Tite_Input}>Last name</label>
                    <input
                        className={styles.Input_Formulaire}
                        placeholder="Last name"
                        defaultValue={fields.lastname}
                        onChange={handleChange}
                        name="lastname"
                        required
                    />
                    <label className={styles.Tite_Input}>User name</label>
                    <input
                        className={styles.Input_Formulaire}
                        placeholder="User name"
                        defaultValue={fields.username}
                        onChange={handleChange}
                        name="username"
                        required
                    />
                    <label className={styles.Tite_Input}>Email</label>
                    <input
                        className={styles.Input_Formulaire}
                        placeholder="Email"
                        defaultValue={fields.email}
                        onChange={handleChange}
                        name="email"
                        required
                    />
                    <label className={styles.Tite_Input}>Company</label>
                    <select className={styles.Input_Formulaire} onChange={handleChange} name="id_company" required>
                        <option value="">--Please choose a company--</option>
                        {companies?.map((company, index: number) => (
                            <option selected={company.id === user.id_company} key={index} value={company.id}>
                                {company.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button className={styles.Button_Update_User}> Update user</button>
                </div>
            </form>
        </div>
    );
};
