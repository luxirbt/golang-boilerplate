/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';

export default function useSearch() {
    const handleSearch = (
        e: { target: HTMLInputElement },
        needle: any[],
        propertyToSearch: string,
        setPageCount: Dispatch<SetStateAction<number>>,
        itemsPerPage: number,
        setItemOffset: Dispatch<SetStateAction<number>>,
        setToShow: Dispatch<SetStateAction<any[]>>,
    ) => {
        const value = e.target.value;

        const needleCopy = [...needle];

        const newList = needleCopy.filter((seeked) => {
            return seeked[propertyToSearch].toLowerCase().startsWith(value.toLowerCase());
        });

        setPageCount(Math.ceil(newList.length / itemsPerPage));
        setItemOffset(0);
        setToShow(newList);
    };

    return { handleSearch };
}
