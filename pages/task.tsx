import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Task() {
  /**  TODO: Create an endpoint that returns a list of people, and use that here.
   * Use tanstack/react-query to fetch the data
   */
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPeople, setTotalPeople] = useState(100);
  const [totalPeopleParameter, setTotalPeopleParameter] = useState(100);
  const [minPeopleError, setMinPeopleError] = useState("");

  type User = {
    name: string;
    email: string;
    title: string;
    role: string;
  };
  const getPeople = async (page: number, total: number) => {
    const res = await fetch(`/api/people?page=${page}&total=${total}`);
    return res.json();
  };

  const { data, error, isLoading } = useQuery(
    ["randomPeople", currentPage, totalPeopleParameter],
    () => getPeople(currentPage, Number(totalPeopleParameter)),
    { staleTime: Infinity, cacheTime: Infinity }
  );

  const handlePreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  if (error)
    return <div className="mx-auto mt-72 text-center">Request Failed</div>;
  if (isLoading)
    return <div className="mx-auto mt-72 text-center">Loading...</div>;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotalPeople(Number(event.target.value));
  };
  const handleSetTotalPeople = () => {
    if (totalPeople >= 100) {
      setMinPeopleError("");
      setTotalPeopleParameter(totalPeople);
    } else {
      setMinPeopleError("You must enter value equal or higher than 100");
    }
  };
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
                {data.paginatedPeople.map((person: User) => (
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
                ))}
              </tbody>
            </table>
            {/* TODO: Pagination */}
            <nav
              className="flex items-center justify-between py-3"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm">
                  Showing{" "}
                  <span className="font-medium">{data.startIndex + 1}</span> to{" "}
                  <span className="font-medium">{data.endIndex}</span> of{" "}
                  <span className="font-medium">{data.totalPeople}</span>{" "}
                  results
                </p>
              </div>
              <div className="hidden sm:block">
                <input
                  type="text"
                  value={totalPeople}
                  onChange={handleChange}
                  className="relative ml-96 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 bg-gray-500 focus-visible:outline-offset-0"
                />
                <button
                  onClick={handleSetTotalPeople}
                  className="relative ml-6 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-500 focus-visible:outline-offset-0"
                >
                  Set People
                </button>
                {minPeopleError && (
                  <p className="ml-96 text-red-500 text-sm font-semibold">
                    {minPeopleError}
                  </p>
                )}
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-500 focus-visible:outline-offset-0"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === data.totalPages}
                  className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-500 focus-visible:outline-offset-0"
                >
                  Next
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
