/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useContext, ChangeEvent, SetStateAction, Dispatch } from 'react';
import ReactPaginate from 'react-paginate';
import { PaginationContext } from '../../context/PaginationContext';
import styles from '../../styles/pagination.module.scss';

interface PaginationProps {
    items: any[];
    itemsPerPage: number;
    setItems: Dispatch<SetStateAction<any[]>>;
}
export const Pagination = ({ items, itemsPerPage, setItems }: PaginationProps) => {
    const { itemOffset, setItemOffset, pageCount, setPageCount, setResetPage, setItemsPerPage } =
        useContext(PaginationContext);

    const handlePageClick = (e: { selected: number }) => {
        const newOffset = (e.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        setItems(items?.slice(itemOffset, itemOffset + itemsPerPage));
        setPageCount(Math.ceil(items?.length / itemsPerPage));
    }, [setPageCount, itemOffset, items, setItems, itemsPerPage]);

    const handleChangeItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(parseInt(e.target.value));
        setResetPage(0);
        setItemOffset(0);
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <ul>
                <label style={{ marginRight: '0.5em' }}>Items per page</label>
                <select onChange={handleChangeItemsPerPage}>
                    <option value={5}>5</option>
                    <option value={10} selected>
                        10
                    </option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>
            </ul>
            {items?.length > itemsPerPage && (
                <ReactPaginate
                    previousLabel={'<<'}
                    nextLabel={'>>'}
                    pageCount={pageCount}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={styles.pagination}
                    activeClassName={styles.active}
                />
            )}
        </div>
    );
};
