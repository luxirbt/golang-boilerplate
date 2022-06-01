import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { applicationRepository } from '../../lib/repository/ApplicationRepository';
import { queryClient } from '../../pages/_app';

const useApplicationData = () => {
    const alert = useAlert();
    const { t } = useTranslation();
    const useFetchApplications = () => {
        return useQuery('applications', applicationRepository.getAll, {
            onError: (err) => {
                alert.error(`${t('common.error.loading')} : ${err}`);
            },
        });
    };

    const useFetchApplication = (id: number) => {
        return useQuery(['application', id], () => applicationRepository.get(id), {
            onError: (err) => {
                alert.error(`${t('common.error.loading')} : ${err}`);
            },
        });
    };

    const useAddApplicationData = () => {
        return useMutation(applicationRepository.save, {
            onSuccess: () => {
                alert.success(t('applications.add.success'));
                queryClient.invalidateQueries('applications');
            },
            onError: () => {
                alert.error(t('applications.add.error'));
            },
        });
    };

    return { useFetchApplications, useAddApplicationData, useFetchApplication };
};

export default useApplicationData;
