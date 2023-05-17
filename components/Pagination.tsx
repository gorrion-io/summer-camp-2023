import React from "react";
import { User } from "../types";

interface Props {
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  people: {
    users: User[];
  } | null;
  currentPage: number;
  totalResults: number | null;
  totalPages: number;
}

const Pagination = ({
  handlePreviousPage,
  handleNextPage,
  people,
  currentPage,
  totalResults,
  totalPages,
}: Props) => {
  return (
    <nav
      className='flex items-center flex-col md:flex-row justify-between py-3 px-4'
      aria-label='Pagination'
    >
      <div className='block'>
        {people && (
          <p className='text-sm'>
            Showing{" "}
            <span className='font-medium'>{(currentPage - 1) * 10 + 1}</span> to{" "}
            <span className='font-medium'>
              {Math.min(
                (currentPage - 1) * 10 + people.users.length,
                totalResults ? totalResults : 0
              )}
            </span>{" "}
            of <span className='font-medium'>{totalResults}</span> results
          </p>
        )}
      </div>
      <div className='flex flex-1 justify-end'>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className='relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black hover:cursor-pointer duration-100 focus-visible:outline-offset-0'
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className='relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black duration-100 focus-visible:outline-offset-0'
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
