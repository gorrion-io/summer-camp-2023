import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Task() {
  const [page, setPage] = useState(0);
  const { data, error } = useSWR(`/api/people?page=${page}`, fetcher);

  const getStart = () => {
    return page === 0 ? 1 : page * data?.PEOPLE_PER_PAGE; 
  };
  const getEnd = () => {
    return (page + 1) * data?.PEOPLE_PER_PAGE;
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
                { error ? <div>Couldn't load data...</div> : data?.data.map((person) => (
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
            <nav
              className="flex items-center justify-between py-3"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm">
                  Showing <span className="font-medium">{ getStart() }</span> to{" "}
                  <span className="font-medium">{ getEnd() }</span> of{" "}
                  <span className="font-medium">{ data?.NUMBER_OF_PEOPLE }</span> results
                </p>
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                  onClick={() => page > 0 ? setPage(page - 1) : null}
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                  onClick={() => page < (data?.NUMBER_OF_PEOPLE / data?.PEOPLE_PER_PAGE) - 1 ? setPage(page + 1) : null}
                >
                  Next
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}