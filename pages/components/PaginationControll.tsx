import { FC } from "react";
import Pagination from "./Pagination";
import { PaginationControlsProps } from "../types";

const PaginationControls: FC<PaginationControlsProps> = ({
  page,
  nextPage,
  prevPage,
  totalPages,
  handlePageChange,
  hasNextPage,
  hasPrevPage,
}) => (
  <nav
    className="flex items-center justify-between py-3"
    aria-label="Pagination"
  >
    <div className="hidden sm:block">
      <p className="text-sm">
        Showing <span className="font-medium">{page}</span> of{" "}
        <span className="font-medium">{totalPages}</span> pages
      </p>
    </div>
    <Pagination
      currentPage={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
    <div className="flex justify-between sm:justify-end">
      <button
        className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:text-black hover:bg-gray-50 focus-visible:outline-offset-0"
        onClick={prevPage}
        disabled={!hasPrevPage}
      >
        Previous
      </button>
      <button
        className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black focus-visible:outline-offset-0"
        onClick={nextPage}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  </nav>
);

export default PaginationControls;
