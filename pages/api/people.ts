import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { User, Response, ErrorResponse } from "@/types/Response";

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

const paginate = (people: User[]) => {
  const recsPerPage = 10;
  const pages = Math.ceil(people.length / recsPerPage);
  const result = [];

  for (let i = 0; i < pages; i++) {
    result.push(people.slice(i * recsPerPage, (i + 1) * recsPerPage));
  }

  return result;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | ErrorResponse>
) {
  const { page = 1, recsNum = 100 } = req.query;

  const people: User[][] = paginate(
    generateRecords(Number(recsNum) < 100 ? 100 : Number(recsNum))
  );

  if (!people[Number(page) - 1])
    res.status(400).json({ error: "Page not found!" });

  res.status(200).json({
    data: people[Number(page) - 1],
    page: Number(page),
    recsNum: Number(recsNum),
  });
}
