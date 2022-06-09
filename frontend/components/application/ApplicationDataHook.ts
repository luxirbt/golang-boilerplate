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
    const { setIsFormUpdate, setIsFormCreate } = useContext(AppContext);
    const { setApplication } = useContext(ApplicationContext);

    const { t } = useTranslation();
    const useFetchApplications = () => {
        return useQuery('applications', applicationRepository.getAll, {
            onError: ({ response }) => {
                alert.error(`${t('common.error.loading')} : ${response.data.reason}`);
            },
        });
    };

    const useFetchApplication = (id: number) => {
        return useQuery(['application', id], () => applicationRepository.get(id), {
            onError: ({ response }) => {
                alert.error(`${t('common.error.loading')} : ${response.data.reason}`);
            },
        });
    };

    const useAddApplicationData = () => {
        return useMutation(applicationRepository.save, {
            onSuccess: () => {
                alert.success(t('applications.add.success'));
                setIsFormCreate(false);
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
                alert.success(t('applications.update.success'));
                setIsFormUpdate(false);
                setApplication({
                    id: 0,
                    appname: '',
                    url: '',
                    displayname: '',
                    webapp: false,
                    svg_light: '',
                    svg_dark: '',
                    id_application: 0,
                });
                queryClient.invalidateQueries('applications');
            },
            onError: ({ response }) => {
                alert.error(`${t('application.update.error')} : ${response.data.reason}`);
            },
        });
    };

    return { useFetchApplications, useAddApplicationData, useFetchApplication, useUpdateApplication };
};

export default useApplicationData;
