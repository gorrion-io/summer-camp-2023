import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Loader from "@/components/Loader";
import PeopleList from "@/components/PeopleList";
import Pagination from "@/components/Pagination";

const fetchPeople = async (page: number, numUsers: number) => {
  const response = await fetch(`/api/people?page=${page}&numUsers=${numUsers}`);
  if (!response.ok) {
    throw new Error("Failed to fetch people");
  }
  return response.json();
};

export default function Task() {
  const [numUsers, setNumUsers] = useState(100);
  const [totalResults, setTotalResults] = useState(numUsers);
  const [inputNumber, setInputNumber] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalResults ? totalResults / 10 : 0);

  const {
    data: people,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["people", currentPage],
    queryFn: () => fetchPeople(currentPage, numUsers),
    keepPreviousData: true,
    staleTime: 60000,
    onError: (error) => {
      console.error("Error fetching people:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNumUsers(inputNumber);
    setTotalResults(inputNumber);
    setCurrentPage(1);
    refetch();
  };

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNumber(Number(e.target.value));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className='mx-auto max-w-7xl'>
      {isLoading && <Loader />}
      {isError && "Error"}
      <div className='mt-8 flow-root'>
        <form className='flex mx-4' onSubmit={handleSubmit}>
          <label className='flex flex-col' htmlFor='inputNumber'>
            <span className='text-xs p-1'>Set number of people</span>
            <input
              className='w-36 -mt-1 mb-1 p-1 bg-black border border-white text-white-500 rounded-md focus:outline-white'
              id='inputNumber'
              onChange={handleInputName}
              type='number'
              value={inputNumber}
              name='inputNumber'
              step='10'
            />
          </label>
          <button
            className='self-end py-1 px-6 mb-1 ml-2 border border-white font-medium rounded-md hover:bg-white hover:text-black duration-200'
            type='submit'
          >
            SET
          </button>
        </form>
        <PeopleList people={people} />
        <Pagination
          people={people}
          currentPage={currentPage}
          totalResults={totalResults}
          totalPages={totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      </div>
    </div>
  );
}
