import { useAlert } from 'react-alert';
import { useMutation, useQuery } from 'react-query';
import UpdateUserDTO from '../../lib/types/dto/user/updateUserDTO';
import { userRepository } from '../../lib/repository/UserRepository';
import { queryClient } from '../../pages/_app';
import User from '../../lib/types/models/user/user';
import { useTranslation } from 'react-i18next';

const useUserData = () => {
    const alert = useAlert();
    const { t } = useTranslation();

    const useFetchUsers = () => {
        return useQuery<User[], Error>('users', userRepository.getAll, {
            onError: (err) => {
                alert.error(`${t('common.error.loading')} : ${err}`);
            },
        });
    };

    const useFetchUser = (id: number) => {
        return useQuery<User, Error>('user', () => userRepository.get(id), {
            onError: (err) => {
                alert.error(`${t('common.error.loading')} : ${err}`);
            },
        });
    };

    const useAddUser = () => {
        return useMutation(userRepository.save, {
            onSuccess: () => {
                alert.success(t('users.add.success'));
                queryClient.invalidateQueries('users');
            },
            onError: (err) => {
                alert.error(`${t('users.add.error')} : ${err}`);
            },
        });
    };

    const useUpdateUser = (id: number) => {
        return useMutation((data: UpdateUserDTO) => userRepository.updateUser(id, data), {
            onSuccess: () => {
                alert.success(t('users.update.success'));
                queryClient.invalidateQueries('users');
            },
            onError: (err) => {
                alert.error(`${t('users.update.error')} : ${err}`);
            },
        });
    };

    return { useFetchUsers, useAddUser, useUpdateUser, useFetchUser };
};

export default useUserData;
