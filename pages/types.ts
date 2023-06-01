export type User = {
    name: string;
    email: string;
    title: string;
    role: string;
  };
  
  export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
  }

  export interface PaginationControlsProps {
    page: number;
    nextPage: () => void;
    prevPage: () => void;
    totalPages: number;
    handlePageChange: (pageNumber: number) => void;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }
  