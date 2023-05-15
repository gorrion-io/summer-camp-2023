import type {NextApiRequest, NextApiResponse} from "next";
import {faker} from "@faker-js/faker";

type User = {
  name: string;
  email: string;
  title: string;
  role: string;
};

type Response<T> = {
  readonly data: T;
  readonly currentPage: number;
  readonly totalAmountOfPages: number;
};

type ErrorResponse = {
  readonly error: string;
};

/**
 * TODO: Prepare an endpoint to return a list of users
 * User faker.js or similar library to generate fake data, the minimal number of users is 100
 * The endpoint should return a pagination of 10 users per page
 * The endpoint should accept a query parameter "page" to return the corresponding page
 */

function generateRandomUsers  (totalAmountOfUsers: number): User[] {
  const users: User[] = [];
  for (let i: number = 0; i < totalAmountOfUsers; i++) {
    const user: User = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      title: faker.person.jobTitle(),
      role: faker.person.jobType(),
    };
    users.push(user);
  }
  return users;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<User[]> | ErrorResponse>
): void {
  const { page = "1" } = req.query;
  const usersAmountPerPage: number = 10;
  const totalAmountOfUsers: number = 100;
  const totalAmountOfPages: number = Math.ceil(totalAmountOfUsers / usersAmountPerPage);

  const currentPage: number = Number(page);
  if (currentPage > totalAmountOfPages) {
    res.status(400).json({ error: "Invalid page number" });
    return;
  }

  const startIndex: number = (currentPage - 1) * usersAmountPerPage;
  const endIndex: number = startIndex + usersAmountPerPage;

  const users: User[] = generateRandomUsers(totalAmountOfUsers)
  const paginatedUsers: User[] = users.slice(startIndex, endIndex);

  const response: Response<User[]> = {
    data: paginatedUsers,
    currentPage,
    totalAmountOfPages
  };

  res.status(200).json(response);
};
