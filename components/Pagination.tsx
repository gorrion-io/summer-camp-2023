import React from "react";
import { Direction } from "@/pages/task";
import { NUM_OF_PAGES, NUM_OF_USERS } from "@/constants";

export default function Pagination({
  page,
  handleSettingPage,
}: {
  page: number;
  handleSettingPage: (direction: Direction) => void;
}) {
  return (
    <nav>
      <div className="hidden sm:block">
        <p className="text-sm">
          Showing <span className="font-medium">{page}</span> to{" "}
          <span className="font-medium">{NUM_OF_PAGES}</span> of{" "}
          <span className="font-medium">{NUM_OF_USERS}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          onClick={() => handleSettingPage(Direction.PREV)}
          className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Previous
        </button>
        <button
          onClick={() => handleSettingPage(Direction.NEXT)}
          className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
