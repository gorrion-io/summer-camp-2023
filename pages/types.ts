export type User = {
    name: string;
    email: string;
    title: string;
    role: string;
  };
  
export type Response = {
    paginatedUsers: User[];
    paginationStartIndex: number;
    TOTAL_USERS: number;
  };