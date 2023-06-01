import { PaginationProps } from "../types";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbersToShow = 10;
  const halfWay = Math.ceil(pageNumbersToShow / 2);

  const startPage = Math.max(
    Math.min(currentPage - halfWay, totalPages - pageNumbersToShow + 1),
    1
  );
  const endPage = Math.min(
    Math.max(currentPage + halfWay, pageNumbersToShow),
    totalPages
  );

  const isFirstPageVisible = startPage > 2;
  const isLastPageVisible = endPage < totalPages - 1;

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <nav className="flex justify-center mt-4 space-x-1">
      {isFirstPageVisible && (
        <>
          <button
            className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:text-black hover:bg-gray-50 focus-visible:outline-offset-0"
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          <span className="mx-2 text-gray-400">...</span>
        </>
      )}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:text-black hover:bg-gray-50 focus-visible:outline-offset-0 ${
            pageNumber === currentPage ? " bg-gray-700 text-white" : ""
          }`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      {isLastPageVisible && (
        <>
          <span className="mx-2 text-gray-400">...</span>
          <button
            className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:text-black hover:bg-gray-50 focus-visible:outline-offset-0"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
    </nav>
  );
};

export default Pagination;
