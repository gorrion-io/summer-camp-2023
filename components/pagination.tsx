import { User } from "@/types/Response";

type Props = {
  people: User[];
};

const Pagination: React.FC<Props> = ({ people }) => {
  return (
    <>
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
    </>
  );
};

export default Pagination;
