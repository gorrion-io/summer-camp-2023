import { NUM_PAGES, NUM_USERS } from "@/config_params";
import { Direction } from "../task";

type Pagination = {
    page: number 
    onPageChange: (type: Direction) => void
}

function Pagination({page, onPageChange} : Pagination){    

    return (
        <nav
              className="flex items-center justify-between py-3"
              aria-label="Pagination"
            >
            <div className="hidden sm:block">
                <p className="text-sm">
                  Showing <span className="font-medium">{page}</span> to{" "}
                  <span className="font-medium">{NUM_PAGES}</span> of{" "}
                  <span className="font-medium">{NUM_USERS}</span> results
                </p>
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
              <a
                className="cursor-pointer relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                onClick={() => onPageChange(Direction.PREVIOUS)}
              >
                Previous
              </a>
              <a
                className="cursor-pointer relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                onClick={() => onPageChange(Direction.NEXT)}
              >
                Next
              </a>
            </div>
            </nav>

    );
    

};



export default Pagination;