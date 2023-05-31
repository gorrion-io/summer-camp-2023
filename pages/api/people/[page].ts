import { usersCount, usersPerPage } from "@/helpers/constants";
import { User } from "@/helpers/types";
import { getRandomUsers } from "@/helpers/utils";
import type { NextApiRequest, NextApiResponse } from "next";

const people = getRandomUsers(usersCount).sort((u1, u2) =>
  u1.name > u2.name ? 1 : -1,
);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>,
) {
  if (req.method == "GET") {
    const pageNumber = Number(req.query.page);
    const apiResponse: User[] = people.slice(
      (pageNumber - 1) * usersPerPage,
      pageNumber * usersPerPage,
    );
    return res.status(200).json(apiResponse);
  }
}
