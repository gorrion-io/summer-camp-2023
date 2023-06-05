import { useQuery } from "@tanstack/react-query";
import { ReactElement, useState } from "react";
import Loading from "./loading";
import { User, Response } from "./types";


export default function Task(): ReactElement {
  
  const [page, setPage] = useState(1);

  const fetchUsers = async (page: number): Promise<Response> => {
    const res = await fetch(`/api/people?page=${page}`);
    if (!res.ok) {
      throw new Error(
        "Something went wrong"
      );
    }
    return res.json();
  };

  const {data, isError, error} = useQuery(["people", page], () => fetchUsers(page));


  if (isError) return <div>{error as string}</div>;

  return (
    <div className="mx-auto max-w-7xl  ">
      <div className="mt-8 flow-root border` border-[#4299e1]` ">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-end sm:px-6 lg:px-8">
            <table className="min-w-full divide-y` divide-babyblue`  pl-4">
              <thead className="bg-powderblue">
                <tr>
                  <th
                    scope="col"
                    className="w-[25%] py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary sm:pl-3"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="w-[30%] px-3 py-3.5 text-left text-sm font-semibold text-primary"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="w-[30%] px-3 py-3.5 text-left text-sm font-semibold text-primary"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="w-[15%] px-3 py-3.5 text-left text-sm font-semibold text-primary"
                  >
                    Role
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-babyblue [&>*:nth-child(even)]:bg-mintcream [&>*:nth-child(odd)]:bg-snowdrift border-x border-babyblue">
                {
                  data ? 
                
                data?.paginatedUsers.map(
                  (user: User) => (
                    <tr key={user.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-td sm:pl-3">
                        {user.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-td">
                        {user.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-td">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-td">
                        {user.role}
                      </td>
                      <td>
                        
                      </td>
                    </tr>
                  )
                )
                :
                <Loading/>
                }
              </tbody>
            </table>
            <nav
              className="flex items-center justify-between p-3 bg-whisper border border-babyblue"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                Showing{" "}
                <span className="font-medium">
                  {data?.paginationStartIndex != null ? data.paginationStartIndex + 1 : ''}
                </span>{" "}
                {
                  data ? ` to ` : null
                }
                
                <span className="font-medium">
                  {(data?.paginationStartIndex ?? 0) + (data?.paginatedUsers?.length ?? 0)}

                </span>{" "}
                of <span className="font-medium">{data?.TOTAL_USERS}</span>{" "}
                results
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                {page > 1 && (
                  <a
                    onClick={() => setPage(page - 1)}
                    className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-babyblue hover:bg-babyblue select-none duration-300  hover:cursor-pointer focus-visible:outline-offset-0"
                  >
                    Previous
                  </a>
                )}
                {page < 10 && (
                  <a
                    onClick={() => setPage(page + 1)}
                    className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-babyblue duration-300 select-none  hover:cursor-pointer hover:bg-babyblue focus-visible:outline-offset-0"
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
