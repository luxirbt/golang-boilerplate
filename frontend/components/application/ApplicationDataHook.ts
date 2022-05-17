import { useAlert } from 'react-alert';
import { useMutation, useQuery } from 'react-query';
import { applicationRepository } from '../../lib/repository/ApplicationRepository';
import { queryClient } from '../../pages/_app';

const useApplicationData = () => {
    const alert = useAlert();
    const useFetchApplications = () => {
        return useQuery('applications', applicationRepository.getAll);
    };

    const useAddApplicationData = () => {
        return useMutation(applicationRepository.save, {
            onSuccess: () => {
                alert.success('Application créée avec succès');
                queryClient.invalidateQueries('applications');
            },
            onError: () => {
                alert.error('error');
            },
        });
    };

    return { useFetchApplications, useAddApplicationData };
};

export default useApplicationData;
