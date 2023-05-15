import faker from "faker";
import type { NextApiRequest, NextApiResponse } from "next";

type User = {
  name: string;
  email: string;
  title: string;
  role: string;
};

/**
 * TODO: Prepare an endpoint to return a list of users
 * User faker.js or similar library to generate fake data, the minimal number of users is 100
 * The endpoint should return a pagination of 10 users per page
 * The endpoint should accept a query parameter "page" to return the corresponding page
 */

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const page = Number(req.query.page) || 1;
  const perPage = 10;
  const totalPeople = Number(req.query.total) || 100;

  const people: User[] = Array.from( {length: totalPeople}, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    title: faker.person.jobTitle(),
    role: faker.person.jobType(),
  }));

  people.sort((a, b) => a.name.localeCompare(b.name));

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const paginatedPeople = people.slice(startIndex, endIndex);
  res.status(200).json(paginatedPeople);
}
