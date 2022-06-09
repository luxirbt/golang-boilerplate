import axios from 'axios';
import { useContext } from 'react';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { AppContext } from '../../context/AppContext';
import { queryClient } from '../../pages/_app';

const useCompanyData = () => {
    const { t } = useTranslation();

    const { setResetFilter } = useContext(AppContext);

    const alert = useAlert();

    const addCompany = (name: string) => {
        return axios.post('api/company', { name });
    };

    const getCompanies = async () => {
        const { data } = await axios.get('api/company');
        return data;
    };

    const useFetchCompanies = () => {
        return useQuery('companies', getCompanies, {
            onError: ({ response }) => {
                alert.error(
                    `${t('common.error.loading')} : ${response.data.reason ? response.data.reason : response.data}`,
                );
            },
        });
    };

    const useAddCompanyData = () => {
        return useMutation(addCompany, {
            onSuccess: () => {
                alert.success(t('company.add.success'));
                setResetFilter(true);
                queryClient.invalidateQueries('companies');
            },
            onError: ({ response }) => {
                alert.error(`${t('company.add.error')} : ${response.data.reason}`);
            },
        });
    };

    return { useFetchCompanies, useAddCompanyData };
};

export default useCompanyData;
