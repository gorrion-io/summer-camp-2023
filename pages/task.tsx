import Pagination from "@/components/Pagination";
import { useQuery } from "react-query";
import { fetchUsers } from "@/utils/user";
import { useState } from "react";
import { User } from "@/pages/api/people";
import { NUM_OF_PAGES } from "@/constants";

export enum Direction {
  PREV,
  NEXT,
}

export default function Task() {
  const [page, setPage] = useState(1);
  const users = useQuery<User[], Error>(["users", page], () =>
    fetchUsers(page)
  );

  const { isLoading, isError, error, data: people } = users;

  function handleSettingPage(direction: Direction) {
    if (direction === Direction.PREV) {
      setPage((prev) => {
        if (prev > 1) {
          return prev - 1;
        }
        return prev;
      });
    } else if (direction === Direction.NEXT) {
      setPage((prev) => {
        if (prev < NUM_OF_PAGES) {
          return prev + 1;
        }
        return prev;
      });
    }
  }

  if (isLoading) {
    return <p>Users loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
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
                {people?.map((person) => (
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
            <Pagination page={page} handleSettingPage={handleSettingPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
