import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { PeopleResponse } from "./api/people";

const usePeople = () => {
  const pageSize = 10;

  const [page, setPage] = useState(0);

  const { data } = useQuery<PeopleResponse>({
    queryKey: ["people", page],
    queryFn: async () =>
      fetch(`/api/people?page=${page}`).then((res) => res.json()),
  });

  const people = data?.peoples || [];
  const from = page * pageSize + 1;
  const to = from + people.length - 1;

  const resultsCount = {
    from,
    to,
    total: data?.total || "N",
  };

  const isNextDisabled = data?.total === to;

  const goNext = () => setPage((page) => (isNextDisabled ? page : page + 1));
  const goPrevious = () => setPage((page) => (page === 0 ? 0 : page - 1));

  return { people, goNext, goPrevious, resultsCount };
};

export default function Task() {
  const { people, goNext, goPrevious, resultsCount } = usePeople();

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
                {people.map((person) => (
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
                  Showing{" "}
                  <span className="font-medium">{resultsCount.from}</span> to{" "}
                  <span className="font-medium">{resultsCount.to}</span> of{" "}
                  <span className="font-medium">{resultsCount.total}</span>{" "}
                  results
                </p>
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                <a
                  onClick={goPrevious}
                  href="#"
                  className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                >
                  Previous
                </a>
                <a
                  onClick={goNext}
                  href="#"
                  className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
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
