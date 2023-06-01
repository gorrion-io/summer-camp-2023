import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useUsers = (usersCount: number, limit: number) => {
  const [page, setPage] = useState(1);

  const fetchData = async (page: number) => {
    const response = await fetch(
      `/api/people?page=${page}&count=${usersCount}&limit=${limit}`
    );
    return response.json();
  };

  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchData(page),
    onSuccess: (fetchedData) => {
      if (page < fetchedData.totalPages) {
        queryClient.prefetchQuery(["users", page + 1], () =>
          fetchData(page + 1)
        );
      }
    },
  });

  const nextPage = () => {
    setPage((old) => (old < data?.totalPages ? old + 1 : old));
  };

  const prevPage = () => {
    setPage((old) => (old > 1 ? old - 1 : old));
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const hasNextPage = page < data?.totalPages;
  const hasPrevPage = page > 1;

  return {
    data,
    isError,
    isLoading,
    nextPage,
    prevPage,
    handlePageChange,
    page,
    hasNextPage,
    hasPrevPage,
  };
};
