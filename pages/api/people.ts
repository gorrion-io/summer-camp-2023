import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";

type User = {
  name: string;
  email: string;
  title: string;
  role: string;
};
type Response = {
  totalPages: number;
  page: number;
  currentUsers: User[];
};
type Error = {
  message: string;
};

/**
 * TODO: Prepare an endpoint to return a list of users
 * User faker.js or similar library to generate fake data, the minimal number of users is 100
 * The endpoint should return a pagination of 10 users per page
 * The endpoint should accept a query parameter "page" to return the corresponding page
 */
const totalUsers = 100;

function createRandomUser(): User {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    title: faker.person.jobTitle(),
    role: "User",
  };
}
const users: User[] = faker.helpers.multiple(createRandomUser, {
  count: totalUsers,
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | Error>
) {
  const { page = 1 } = req.query;
  const pageNumber = Number(page);
  const usersPerPage = 10;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  if (pageNumber < 1 || pageNumber > totalPages) {
    return res.status(404).json({ message: "Page not found" });
  }

  const indexOfLastUser = pageNumber * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  res.status(200).json({ totalPages, page: pageNumber, currentUsers });
}
