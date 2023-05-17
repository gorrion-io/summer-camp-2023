import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { list } from "postcss";

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
  
  userList.sort((a,b) => a.name > b.name ? 1 : -1);
  return userList;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const { page = 1, count = 100 } = req.query;

  res.status(200).json([]);
}
