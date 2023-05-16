import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { User } from "@/types";
import { TOTAL_AMOUNT_OF_USERS_PER_PAGE } from "@/constans";

type Response<T> = {
  readonly data: T;
  readonly currentPage: number;
  readonly totalAmountOfPages: number;
};

type ErrorResponse = {
  readonly error: string;
};

function generateRandomUsers(totalAmountOfUsers: number): User[] {
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
  const totalAmountOfUsers: number = 100;
  const totalAmountOfPages: number = Math.ceil(
    totalAmountOfUsers / TOTAL_AMOUNT_OF_USERS_PER_PAGE
  );

  const currentPage: number = Number(page);
  if (currentPage > totalAmountOfPages) {
    res.status(400).json({ error: "Invalid page number" });
    return;
  }

  const startIndex: number = (currentPage - 1) * TOTAL_AMOUNT_OF_USERS_PER_PAGE;
  const endIndex: number = startIndex + TOTAL_AMOUNT_OF_USERS_PER_PAGE;

  const users: User[] = generateRandomUsers(totalAmountOfUsers);
  const sortedAndPaginatedUsers: User[] = users
    .slice(startIndex, endIndex)
    .sort((a: User, b: User) => a.name.localeCompare(b.name));

  const response: Response<User[]> = {
    data: sortedAndPaginatedUsers,
    currentPage,
    totalAmountOfPages,
  };

  res.status(200).json(response);
}
