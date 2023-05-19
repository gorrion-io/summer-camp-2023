export type User = {
  name: string;
  email: string;
  title: string;
  role: string;
};

export type Response = {
  pagination: User[];
  paginationStartIndex: number;
  TOTAL_USERS: number;
};
