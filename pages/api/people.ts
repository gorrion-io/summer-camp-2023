import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";

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

const generateRecords = (records: number) => {
  const people = [];

  for (let i = 0; i < Number(records); i++) {
    let firstName = faker.person.firstName();
    let lastName = faker.person.lastName();

    people.push({
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({
        firstName: firstName,
        lastName: lastName,
      }),
      title: faker.person.jobTitle(),
      role: faker.person.jobDescriptor(),
    });
  }

  return people.sort((a, b) => (a.name > b.name ? 1 : -1));
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const { records } = req.query;
  const { page } = req.query;

  const people: Array<User> = generateRecords(Number(records));

  res.status(200).json(people.sort((a, b) => (a.name > b.name ? 1 : -1)));
}
