import { User } from "../types";
import React, { useRef, useEffect } from "react";

interface Props {
  people: {
    users: User[];
  } | null;
}

const PeopleList = ({ people }: Props) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      const computedStyle = window.getComputedStyle(elementRef.current);
      const displayValue = computedStyle.getPropertyValue("display");
      console.log(displayValue);
    }
  }, []);
  return (
    <div className='mx-auto max-w-7xl'>
      <div className='mt-8 flow-root'>
        <div className='mx-2 -my-2 overflow-x-auto '>
          <div className='inline-block min-w-full py-2 align-middle px-2 '>
            <table className='min-w-full divide-y divide-gray-700'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='hidden lg:table-cell py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white lg:pl-0'
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className='hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-white'
                  >
                    Title
                  </th>
                  <th
                    scope='col'
                    className='hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-white'
                  >
                    Email
                  </th>
                  <th
                    scope='col'
                    className='hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-white'
                  >
                    Role
                  </th>
                  <th scope='col' className='relative py-3.5 pl-3 pr-4 lg:pr-0'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-800'>
                {people ? (
                  people.users.map((person: User) => (
                    <tr className='flex-col mx-4' key={person.email}>
                      <td
                        ref={elementRef}
                        className='block lg:table-cell whitespace-nowrap px-3 py-4 text-sm font-medium text-white '
                      >
                        {person.name}
                      </td>
                      <td className='block lg:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                        {person.title}
                      </td>
                      <td className='block lg:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                        {person.email}
                      </td>
                      <td className='block lg:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                        {person.role}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className='py-4 text-center text-white'>
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleList;
