import type { NextApiRequest, NextApiResponse } from 'next';
import { faker } from '@faker-js/faker';
import { numberOfUsers } from '../../parametr';

export type User = {
  name: string;
  email: string;
  title: string;
  role: string;
};

function generateUsers(count: number): User[] {
  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    const user: User = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      title: faker.person.jobTitle(),
      role: faker.person.jobType(),
    };
    users.push(user);
  }

  return users.sort((a, b) => a.name.localeCompare(b.name));
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const { page = 1 } = req.query;
  const pageNumber = parseInt(page as string, 10);
  const pageSize = 10;
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = pageNumber * pageSize;
  const users = generateUsers(numberOfUsers).slice(startIndex, endIndex);
  res.status(200).json(users);
  res.status(200).json([]);
}
