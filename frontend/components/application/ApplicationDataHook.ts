import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { applicationRepository } from '../../lib/repository/ApplicationRepository';
import UpdateApplicationDTO from '../../lib/types/dto/application/updateApplicationDTO';
import { queryClient } from '../../pages/_app';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { ApplicationContext } from '../../context/ApplicationContext';

const useApplicationData = () => {
    const alert = useAlert();
    const { setIsFormUpdate } = useContext(AppContext);
    const { setApplicationId } = useContext(ApplicationContext);

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

    const useUpdateApplication = (id: number) => {
        return useMutation((data: UpdateApplicationDTO) => applicationRepository.updateApplication(id, data), {
            onSuccess: () => {
                alert.success(t('application.update.success'));
                setIsFormUpdate(false);
                setApplicationId(0);
                queryClient.invalidateQueries('applications');
            },
            onError: (err) => {
                alert.error(`${t('application.update.error')} : ${err}`);
            },
        });
    };

    return { useFetchApplications, useAddApplicationData, useFetchApplication, useUpdateApplication };
};

export default useApplicationData;
