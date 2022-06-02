import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

export default function useSearchByProperty(setValueFiltered: Dispatch<SetStateAction<string>>, properties: string[]) {
    const { t } = useTranslation();

    return (
        <select onChange={(e) => setValueFiltered(e.target.value)} style={{ marginRight: '0.5em' }}>
            {properties?.map((property, index) => {
                return (
                    <option key={index} value={property}>
                        {t(`users.list.${property}`)}
                    </option>
                );
            })}
        </select>
    );
}
