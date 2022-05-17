import { useAlert } from 'react-alert';
import { useMutation, useQuery } from 'react-query';
import UpdateUserDTO from '../../lib/types/dto/user/updateUserDTO';
import { userRepository } from '../../lib/repository/UserRepository';
import { queryClient } from '../../pages/_app';
import User from '../../lib/types/models/user/user';

const useUserData = () => {
    const alert = useAlert();

    const useFetchUsers = () => {
        return useQuery<User[], Error>('users', userRepository.getAll);
    };

    const useFetchUser = (id: number) => {
        return useQuery<User, Error>('user', () => userRepository.get(id));
    };

    const useAddUser = () => {
        return useMutation(userRepository.save, {
            onSuccess: () => {
                alert.success('User ajouté');
                queryClient.invalidateQueries('users');
            },
            onError: () => {
                alert.error('error');
            },
        });
    };

    const useUpdateUser = (id: number) => {
        return useMutation((data: UpdateUserDTO) => userRepository.updateUser(id, data), {
            onSuccess: () => {
                alert.success('User modifié');
                queryClient.invalidateQueries('users');
            },
            onError: () => {
                alert.error('error');
            },
        });
    };

    return { useFetchUsers, useAddUser, useUpdateUser, useFetchUser };
};

export default useUserData;
