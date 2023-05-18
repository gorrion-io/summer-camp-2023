import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";

type User = {
  name: string;
  email: string;
  title: string;
  role: string;
};

const TOTAL_USERS = 100;
const USERS_PER_PAGE = 10;

function generateUserData(): User {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    title: faker.person.jobArea(),
    role: faker.person.jobType(),
  };
}

const userList = faker.helpers.multiple(generateUserData, {
  count: TOTAL_USERS,
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const { page = "1" } = req.query;
  const currentPage = Number(page);

  const paginationStartIndex = currentPage * USERS_PER_PAGE;
  const paginationEndIndex = paginationStartIndex + USERS_PER_PAGE;

  const pagination = userList.slice(paginationStartIndex, paginationEndIndex);

  res.status(200).json(pagination);
}
