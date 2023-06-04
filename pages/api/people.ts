import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";
import { User, Response } from "../types";



const USERS_PER_PAGE = 10;
const TOTAL_USERS = 100;


function generateUsers(): User {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    title: faker.person.jobTitle(),
    role: faker.person.jobType(),
  };
}

const userList = faker.helpers.multiple(generateUsers, {
  count: TOTAL_USERS,
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { page = "1" } = req.query;
  const currentPage = Number(page);

  const paginationStartIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginationEndIndex = paginationStartIndex + USERS_PER_PAGE;

  const sortedUsers = userList.sort((a, b) => a.name.localeCompare(b.name))

  const paginatedUsers = sortedUsers.slice(paginationStartIndex, paginationEndIndex);

  const response = {
    paginatedUsers,
    paginationStartIndex,
    TOTAL_USERS,
  };

  res.status(200).json(response);
}