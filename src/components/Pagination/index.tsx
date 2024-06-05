import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  pageCount: number;
  onChangePage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({pageCount, currentPage, onChangePage }) => {
  console.log('Pagination')
  return(
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={pageCount}
    forcePage={currentPage - 1}
  />
)}
