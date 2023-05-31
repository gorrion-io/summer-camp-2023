import { User } from "../pages/api/people";
import { faker } from "@faker-js/faker/locale/en";

function createFakeUser(): User {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    title: faker.person.jobTitle(),
    role: faker.helpers.arrayElement(["Admin", "User"]),
  };
}

export function generateFakeUsers(num: number): User[] {
  const users = faker.helpers.multiple(createFakeUser, {
    count: num < 100 ? 100 : num,
  });
  return users.sort((userA, userB) => userA.name.localeCompare(userB.name));
}

export async function fetchUsers(page: number): Promise<User[]> {
  const users = await fetch(`/api/people?page=${page}`);
  if (!users.ok) {
    throw new Error("Data can't be fetched");
  }
  return users.json();
}
