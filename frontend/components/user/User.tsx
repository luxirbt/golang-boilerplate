import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import User from '../../lib/types/models/user/user';
import useDisplayForm from '../common/hook/DisplayFormHook';

type UserProps = {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    currentUser: User;
};

export default function UserDetail({ user, setUser, currentUser }: UserProps) {
    const { t } = useTranslation();
    const { displayFormUpdate } = useDisplayForm();

    return (
        <tr>
            <td>
                <input
                    type="radio"
                    value={user.id}
                    name="check"
                    onChange={() => setUser(user)}
                    checked={user.id === currentUser.id}
                    onClick={displayFormUpdate}
                />
            </td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.username}</td>
            <td>{user.company_name}</td>
            <td>{user.email}</td>
            <td>{user.is_active == 1 ? t('user.is_active') : t('user.is_inactive')}</td>
        </tr>
    );
}
