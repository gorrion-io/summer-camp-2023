import { FC } from "react";
import { User } from "../types";

const UsersTable: FC<{ users: User[] }> = ({ users }) => (
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
      {users.map((user) => (
        <tr key={user.email}>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
            {user.name}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
            {user.title}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
            {user.email}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
            {user.role}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UsersTable;
