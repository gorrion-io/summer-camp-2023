import { useState } from "react";
import useSWR from "swr";
import { User } from "@/helpers/types";
import Pagination from "@/components/pagination";

async function fetcher<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  return fetch(input, init).then((res) => res.json());
}

export default function Task() {
  const [pageIndex, setPageIndex] = useState(1);
  const {
    data: people,
    isLoading,
    error,
  } = useSWR<User[]>(`/api/people/${pageIndex}`, fetcher);

  if (isLoading) {
    return <></>;
  }

  if (error || people === undefined) {
    return (
      <div className="flex justify-center text-4xl">
        Failed to fetch people.
      </div>
    );
  }

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
            <Pagination setPageIndex={setPageIndex} pageIndex={pageIndex} />
          </div>
        </div>
      </div>
    </div>
  );
}
