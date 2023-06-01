import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { User } from "../types";

let users: User[];
export const limit: number = 10;

const generateUsers = (count: number) => {
  users = Array.from({ length: count }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    title: faker.person.jobTitle(),
    role: faker.person.jobType(),
  }));

  users.sort((a, b) => a.name.localeCompare(b.name));
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ users: User[]; totalPages: number; limit: number }>
) {
  const count = parseInt(req.query.count as string, 10);
  const page = parseInt(req.query.page as string, 10);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  if (!users || users.length < count) {
    generateUsers(count);
  }

  const resultUsers = users.slice(startIndex, endIndex);
  const totalPages = Math.ceil(users.length / limit);

  res.status(200).json({ users: resultUsers, totalPages, limit });
}
