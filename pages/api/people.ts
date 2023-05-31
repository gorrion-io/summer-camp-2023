import type { NextApiRequest, NextApiResponse } from "next";
import { generateFakeUsers } from "../../utils/user";
import { USERS_PER_PAGE, NUM_OF_USERS } from "@/constants";

export type User = {
  name: string;
  email: string;
  title: string;
  role: string;
};

const users = generateFakeUsers(NUM_OF_USERS);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const page = Number(req.query.page);
  const paginatedUsers = users.slice(
    USERS_PER_PAGE * (page - 1),
    USERS_PER_PAGE * (page - 1) + USERS_PER_PAGE
  );
  res.status(200).json(paginatedUsers);
}
