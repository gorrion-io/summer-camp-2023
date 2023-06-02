import {useQuery} from '@tanstack/react-query'
import {User} from '../api/people';
import Pagination from '../components/Pagination';
import { useState } from 'react';
import { fetchUsers } from '@/utils/helper_functions';
import { NUM_PAGES } from '@/config_params';

export enum Direction {
  NEXT, PREVIOUS
}

export default function Task() {
  /**  TODO: Create an endpoint that returns a list of people, and use that here.
   * Use tanstack/react-query to fetch the data
   */
  const [currentPage, setCurrentPage] = useState(1);
    
  const people = useQuery<User[]>(['people', currentPage], () =>
      fetchUsers(currentPage),
      {refetchOnWindowFocus: false}
   ) 

   if(people.isLoading) {
    return <p>Loading...</p>
   } 

   if(people.error) {
    return <p>Error</p>
   }
 
   function onPageChange(direction: Direction){
    if(direction === Direction.NEXT) {
      setCurrentPage((prev) => {
        if(prev < NUM_PAGES) return prev + 1;
        return prev; 
      })
    } else if (direction === Direction.PREVIOUS) {
      setCurrentPage((prev) => {
        if(prev > 1) return prev - 1;
        return prev; 
      })
    }
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
                {people.data?.map((person) => (
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
            
              <Pagination 
                page={currentPage}
                onPageChange={onPageChange}
              />

              
          </div>
        </div>
      </div>
    </div>
  );
}
