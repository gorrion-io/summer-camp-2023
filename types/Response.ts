type User = {
  name: string;
  email: string;
  title: string;
  role: string;
};

type Response = {
  data: User[];
  page: number;
  recsNum: number;
};

type ErrorResponse = {
  error: string;
};

export type { User, Response, ErrorResponse };
