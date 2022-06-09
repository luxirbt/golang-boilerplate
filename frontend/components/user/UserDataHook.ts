import { useAlert } from 'react-alert';
import { useMutation, useQuery } from 'react-query';
import UpdateUserDTO from '../../lib/types/dto/user/updateUserDTO';
import { userRepository } from '../../lib/repository/UserRepository';
import { queryClient } from '../../pages/_app';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { UserContext } from '../../context/UserContext';

const useUserData = () => {
    const alert = useAlert();
    const { t } = useTranslation();
    const { setIsFormUpdate, setIsFormCreate, setResetFilter } = useContext(AppContext);
    const { setUser, setMessageExpired } = useContext(UserContext);

    const useFetchUsers = () => {
        return useQuery('users', userRepository.getAll, {
            onError: ({ response }) => {
                alert.error(`${t('common.error.loading')} : ${response.data.reason}`);
            },
        });
    };

    const useAddUser = () => {
        return useMutation(userRepository.save, {
            onSuccess: () => {
                alert.success(t('users.add.success'));
                setIsFormCreate(false);
                setResetFilter(true);
                queryClient.invalidateQueries('users');
            },
            onError: ({ response }) => {
                alert.error(`${t('users.add.error')} : ${response.data.reason}`);
            },
        });
    };

    const useUpdateUser = (id: number) => {
        return useMutation((data: UpdateUserDTO) => userRepository.updateUser(id, data), {
            onSuccess: () => {
                alert.success(t('users.update.success'));
                setIsFormUpdate(false);
                setUser({
                    id: 0,
                    firstname: '',
                    lastname: '',
                    username: '',
                    email: '',
                    company_name: '',
                    password: '',
                    is_active: 0,
                    id_company: 0,
                });
                queryClient.invalidateQueries('users');
            },
            onError: ({ response }) => {
                alert.error(`${t('users.update.error')} : ${response.data.reason}`);
            },
        });
    };

    const useResetPassword = (id: string) => {
        return useQuery('reset_password', () => userRepository.requestForNewPassword(parseInt(id)), {
            onError: () => {
                setMessageExpired(t('users.update.password.expired_link'));
            },
            enabled: !!id,
        });
    };

    const useSendMail = (id: number) => {
        return useMutation(() => userRepository.sendEmail(id), {
            onSuccess: () => {
                alert.success(t('users.mail.success'));
                setIsFormUpdate(false);
                setUser({
                    id: 0,
                    firstname: '',
                    lastname: '',
                    username: '',
                    email: '',
                    company_name: '',
                    password: '',
                    is_active: 0,
                    id_company: 0,
                });
            },
            onError: ({ response }) => {
                alert.error(`${t('users.mail.error')} : ${response.data.reason}`);
            },
        });
    };

    return { useFetchUsers, useAddUser, useUpdateUser, useResetPassword, useSendMail };
};

export default useUserData;
