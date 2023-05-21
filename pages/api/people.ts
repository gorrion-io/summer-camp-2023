import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { User, Response } from "@/types";
import { userCount } from "@/constants";

const generateUsers = (count: number): User[] => {
  const userList: User[] = [];

  for (let i = 0; i < count; i++) {
    const firstName: string = faker.person.firstName();
    const lastName: string = faker.person.lastName();

    const newUser: User = {
      name: firstName + " " + lastName,
      email: faker.internet.exampleEmail({
        firstName: firstName,
        lastName: lastName,
      }),
      title: faker.person.jobTitle(),
      role: faker.person.jobType(),
    };
    userList.push(newUser);
  }

  userList.sort((a, b) => a.name.localeCompare(b.name));
  return userList;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { page = 1 } = req.query;
  const parsedPage = parseInt(page as string, 10);

  const sortedUserList = generateUsers(userCount);
  const usersPerPage = 10;
  const numOfPages = Math.ceil(userCount / usersPerPage);
  const startIndex = (parsedPage - 1) * 10;
  const paginatedUserList = sortedUserList.slice(startIndex, startIndex + 10);
  res.status(200).json({ users: paginatedUserList, numOfPages });
}
