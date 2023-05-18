import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { User } from "@/types";
import {
  TOTAL_AMOUNT_OF_USERS,
  TOTAL_AMOUNT_OF_USERS_PER_PAGE,
} from "@/constans";

type Response<T> = {
  readonly data: T;
  readonly currentPage: number;
  readonly totalAmountOfPages: number;
};

type ErrorResponse = {
  readonly error: string;
};

function generateRandomUsers(): User {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    title: faker.person.jobTitle(),
    role: faker.person.jobType(),
  };
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<User[]> | ErrorResponse>
): void {
  const { page = "1" } = req.query;
  const totalAmountOfPages: number = Math.ceil(
    TOTAL_AMOUNT_OF_USERS / TOTAL_AMOUNT_OF_USERS_PER_PAGE
  );

  const currentPage: number = Number(page);
  if (currentPage > totalAmountOfPages) {
    res.status(400).json({ error: "Invalid page number" });
    return;
  }

  const startIndex: number = (currentPage - 1) * TOTAL_AMOUNT_OF_USERS_PER_PAGE;
  const endIndex: number = startIndex + TOTAL_AMOUNT_OF_USERS_PER_PAGE;

  const users: User[] = faker.helpers.multiple(generateRandomUsers, {
    count: TOTAL_AMOUNT_OF_USERS,
  });

  const sortedAndPaginatedUsers: User[] = users
    .sort((a: User, b: User) => a.name.localeCompare(b.name))
    .slice(startIndex, endIndex);

  const response: Response<User[]> = {
    data: sortedAndPaginatedUsers,
    currentPage,
    totalAmountOfPages,
  };

  res.status(200).json(response);
}
