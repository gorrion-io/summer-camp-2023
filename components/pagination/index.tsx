import { usersCount, usersPerPage } from "@/helpers/constants";

export default function Pagination({
  setPageIndex,
  pageIndex,
}: {
  setPageIndex: (idx: number) => void;
  pageIndex: number;
}) {
  return (
    <nav
      className="flex items-center justify-between py-3"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm">
          Showing{" "}
          <span className="font-medium">
            {(pageIndex - 1) * usersPerPage + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(usersCount, pageIndex * usersPerPage)}
          </span>{" "}
          of <span className="font-medium">{usersCount}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <a
          onClick={() => setPageIndex(Math.max(1, pageIndex - 1))}
          className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Previous
        </a>
        <a
          onClick={() =>
            setPageIndex(
              Math.min(Math.ceil(usersCount / usersPerPage), pageIndex + 1),
            )
          }
          className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Next
        </a>
      </div>
    </nav>
  );
}
