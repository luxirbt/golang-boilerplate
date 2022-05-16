import React, { useState, Dispatch, SetStateAction, createContext } from 'react';

interface IPaginationContext {
    itemOffset: number;
    setItemOffset: Dispatch<SetStateAction<number>>;
    pageCount: number;
    setPageCount: Dispatch<SetStateAction<number>>;
    resetPage: number;
    setResetPage: Dispatch<SetStateAction<number>>;
    itemsPerPage: number;
    setItemsPerPage: Dispatch<SetStateAction<number>>;
}

export const PaginationContext = createContext<IPaginationContext>({} as IPaginationContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PaginationProvider({ children }: any) {
    const [itemOffset, setItemOffset] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const [resetPage, setResetPage] = useState<number>(0);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    return (
        <PaginationContext.Provider
            value={{
                itemOffset,
                setItemOffset,
                pageCount,
                setPageCount,
                resetPage,
                setResetPage,
                itemsPerPage,
                setItemsPerPage,
            }}
        >
            {children}
        </PaginationContext.Provider>
    );
}
