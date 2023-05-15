import type {NextApiRequest, NextApiResponse} from "next";
import {faker} from "@faker-js/faker";

type User = {
  name: string;
  email: string;
  title: string;
  role: string;
};

type Response = {
 readonly data: User[];
};

/**
 * TODO: Prepare an endpoint to return a list of users
 * User faker.js or similar library to generate fake data, the minimal number of users is 100
 * The endpoint should return a pagination of 10 users per page
 * The endpoint should accept a query parameter "page" to return the corresponding page
 */

function generateRandomUsers  (totalAmountOfUsers: number): User[] {
  const users: User[] = [];
  for (let i:number = 0; i < totalAmountOfUsers; i++) {
    const user: User = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      title: faker.person.jobTitle(),
      role: faker.person.jobType(),
    };
    users.push(user);
  }
  return users;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
): void {
  const totalAmountOfUsers: number = 100
  const users: User[] = generateRandomUsers(totalAmountOfUsers)

  const response: Response = {
    data: users,
  }

  res.status(200).json(response);
}
