import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";

type User = {
  name: string;
  email: string;
  title: string;
  role: string;
};

const users: User[] = [];

// filling the user list with false data
for(let i = 0; i < 100; i++) {
  const fakeUser: User = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    title: faker.person.jobTitle(),
    role: faker.helpers.arrayElement(['Admin', 'Manager', 'User'])
  }
  users.push(fakeUser);
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  const page = query.page as string;
  const pageNumber = parseInt(page, 10);
  const lastPage = Math.ceil(users.length / 10);
  const rangeFrom = (pageNumber - 1) * 10;
  const rangeTo = pageNumber * 10;
  const dataRange = (pageNumber === lastPage)? users.length : pageNumber * 10;
  const listOfUsers = users.slice(rangeFrom,rangeTo);

  res.status(200).json({listOfUsers, pageNumber, lastPage, results: users.length, dataRange});
}
