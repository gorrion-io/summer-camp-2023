// Task.tsx
import { FC } from "react";
import { useUsers } from "./hooks/useUsers";
import UsersTable from "./components/usersTable";
import PaginationControls from "./components/PaginationControll";
import { limit } from "./api/people";

const Task: FC = () => {
  const usersCount = 10000;
  const {
    data,
    isError,
    isLoading,
    nextPage,
    prevPage,
    handlePageChange,
    page,
    hasNextPage,
    hasPrevPage,
  } = useUsers(usersCount, limit);

  if (isError) return <div>An error has occurred.</div>;
  if (isLoading) return <div>Loading, please wait...</div>;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {data.users && <UsersTable users={data.users} />}
            <PaginationControls
              page={page}
              nextPage={nextPage}
              prevPage={prevPage}
              totalPages={data && data.totalPages}
              handlePageChange={handlePageChange}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
