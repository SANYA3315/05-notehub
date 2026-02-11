import ReactPaginate from "react-paginate";

interface PaginationProps {
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  onChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      onPageChange={e => onChange(e.selected + 1)}
    />
  );
}
