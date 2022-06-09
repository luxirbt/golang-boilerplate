/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Dispatch, SetStateAction, useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import { PaginationContext } from '../../../context/PaginationContext';

export default function useSearch(needle: any[], propertyToSearch: string, setToShow: Dispatch<SetStateAction<any[]>>) {
    const { resetFilter, setResetFilter } = useContext(AppContext);
    const { setItemOffset, itemsPerPage, setPageCount } = useContext(PaginationContext);
    const [searchValue, setSearchValue] = useState<string>('');

    const handleSearch = (e: { target: HTMLInputElement }) => {
        const value = e.target.value;

        const needleCopy = [...needle];

        const newList = needleCopy.filter((seeked) => {
            return seeked[propertyToSearch].toLowerCase().startsWith(value.toLowerCase());
        });

        setSearchValue(value);
        setResetFilter(false);
        setPageCount(Math.ceil(newList.length / itemsPerPage));
        setItemOffset(0);
        setToShow(newList);
    };

    return (
        <input placeholder="Rechercher" onChange={handleSearch} type="search" value={resetFilter ? '' : searchValue} />
    );
}
