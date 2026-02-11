// src/components/Pagination/Pagination.tsx
import ReactPaginate from "react-paginate";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1} 
      onPageChange={e => onChange(e.selected + 1)}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      containerClassName="pagination"
      activeClassName="active"
    />
  );
}
