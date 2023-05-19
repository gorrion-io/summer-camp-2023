import { useQuery } from "@tanstack/react-query";
import { ReactElement, useState } from "react";
import { Response, User } from "./types";

export default function Task(): ReactElement {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPeople = async (page: number): Promise<Response> => {
    const res = await fetch(`/api/people?page=${page}`);
    if (!res.ok) {
      throw new Error(
        "There was a problem loading the data. Please contact the administrator."
      );
    }
    return res.json();
  };

  const {
    data: people,
    isLoading,
    isError,
    error,
  } = useQuery(["people", currentPage], () => fetchPeople(currentPage));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error as string}</div>;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Role
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {people?.pagination.map(
                  (person: User): ReactElement => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {person.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {person.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {person.role}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <nav
              className="flex items-center justify-between py-3"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                Showing{" "}
                <span className="font-medium">
                  {people?.paginationStartIndex + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {people?.paginationStartIndex + people?.pagination?.length}
                </span>{" "}
                of <span className="font-medium">{people?.TOTAL_USERS}</span>{" "}
                results
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                {currentPage != 1 && (
                  <a
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 select-none duration-300 hover:text-black hover:cursor-pointer focus-visible:outline-offset-0"
                  >
                    Previous
                  </a>
                )}
                {currentPage != 10 && (
                  <a
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 duration-300 select-none hover:text-black hover:cursor-pointer hover:bg-gray-50 focus-visible:outline-offset-0"
                  >
                    Next
                  </a>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
