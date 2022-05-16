/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { ReactElement } from 'react';
import { Dispatch, SetStateAction } from 'react';

export interface SearchProps {
    needle: any[];
    setFilteredList: Dispatch<SetStateAction<any[]>>;
    searchParam: string;
    style: React.CSSProperties;
}

export function Search({ needle, setFilteredList, searchParam, style }: SearchProps): ReactElement {
    const handleSearch = (e: { target: HTMLInputElement }) => {
        const value = e.target.value;

        const needleCopy = [...needle];

        const newList = needleCopy.filter((seeked) => {
            return searchParam
                ? seeked[searchParam].toLowerCase().startsWith(value.toLowerCase())
                : seeked.toLowerCase().startsWith(value.toLowerCase());
        });

        newList.length !== 0 ? setFilteredList(newList) : setFilteredList(needle);
    };

    return <input placeholder="Rechercher" style={style} onChange={handleSearch} type="search" />;
}
