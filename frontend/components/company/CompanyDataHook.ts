import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from '../../pages/_app';

const useCompanyData = () => {
    const addCompany = (name: string) => {
        return axios.post('api/company', { name });
    };

    const getCompanies = async () => {
        const { data } = await axios.get('api/company');
        return data;
    };

    const useFetchCompanies = () => {
        return useQuery('companies', getCompanies);
    };

    const useAddCompanyData = () => {
        return useMutation(addCompany, {
            onSuccess: () => {
                queryClient.invalidateQueries('companies');
            },
        });
    };

    return { useFetchCompanies, useAddCompanyData };
};

export default useCompanyData;
