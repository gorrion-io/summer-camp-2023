import { APP_CONFIG } from "@/config";
import User from "@/types/User";
import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  totalPages: number;
  users: User[];
};
type Error = {
  message: string;
};

function createRandomUser(): User {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    title: faker.person.jobTitle(),
    role: faker.helpers.arrayElement(["Admin", "User"]),
  };
}
const users: User[] = faker.helpers.multiple(createRandomUser, {
  count: APP_CONFIG.TOTAL_USERS,
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | Error>
) {
  const { page = 1 } = req.query;
  const pageNumber = Number(page);
  const usersPerPage = 10;
  const totalPages = Math.ceil(APP_CONFIG.TOTAL_USERS / usersPerPage);

  if (pageNumber < 1 || pageNumber > totalPages) {
    return res.status(404).json({ message: "Page not found" });
  }
  const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));
  const indexOfLastUser = pageNumber * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  res.status(200).json({ totalPages, users: currentUsers });
}
