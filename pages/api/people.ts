import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";

type User = {
  name: string;
  email: string;
  title: string;
  role: string;
};

const TOTAL_USERS = 100;

function generateUserData(): User {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    title: faker.person.jobArea(),
    role: faker.person.jobType(),
  };
}

const userList = faker.helpers.multiple(generateUserData, { count: TOTAL_USERS });

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
  res.status(200).json(userList);
}
