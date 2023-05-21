import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";

export type User = {
  name: string;
  email: string;
  title: string;
  role: string;
};

type Response = {
  users: User[],
  numOfPages: number
}
export const userCount: number = 200;
/**
 * TODO: Prepare an endpoint to return a list of users
 * User faker.js or similar library to generate fake data, the minimal number of users is 100
 * The endpoint should return a pagination of 10 users per page
 * The endpoint should accept a query parameter "page" to return the corresponding page
 */

// TODO: delete before contributing
// funciton: generate min 100 users
// create new list of users
// use faker.js to generate data
// sort created list and return it

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
  
  userList.sort((a,b) => a.name.localeCompare(b.name));
  return userList;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { page = 1 } = req.query;
  const parsedPage = parseInt(page as string, 10);
  
  const sortedUserList = generateUsers(userCount);
  const usersPerPage = 10;
  const numOfPages = Math.ceil(userCount / usersPerPage);
  const startIndex = (parsedPage -1) * 10;
  const paginatedUserList = sortedUserList.slice(startIndex, startIndex + 10);
  res.status(200).json({users: paginatedUserList, numOfPages});
}
