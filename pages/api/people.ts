import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";

type User = {
  name: string;
  email: string;
  title: string;
  role: string;
};

const generateUsers = (numUsers: number): User[] => {
  const users: User[] = [];
  for (let i = 0; i < numUsers; i++) {
    const user: User = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      title: faker.person.jobTitle(),
      role: faker.person.jobType(),
    };
    users.push(user);
  }
  users.sort((a, b) => a.name.localeCompare(b.name));
  return users;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ users: User[]; totalResults: number }>
) {
  const numUsers: number =
    Number(req.query.numUsers) < 100 ? 100 : Number(req.query.numUsers) || 100;
  const page: number = Number(req.query.page) || 1;
  const perPage: number = 10;

  const users: User[] = generateUsers(numUsers);

  const startIndex: number = (page - 1) * perPage;
  const endIndex: number = startIndex + perPage;

  const usersForPage: User[] = users.slice(startIndex, endIndex);
  const totalResults: number = users.length;

  res.status(200).json({ users: usersForPage, totalResults });
}
