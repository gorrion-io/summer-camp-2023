import { User } from "../pages/api/people";
import { faker } from "@faker-js/faker/locale/en";

function createFakeUser(): User {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    title: faker.person.jobTitle(),
    role: faker.helpers.arrayElement(["admin", "user"]),
  };
}

export function generateFakeUsers(num: number): User[] {
  let users = [];
  if (num < 100) {
    num = 100;
  }

  for (let i = 0; i < num; i++) {
    users.push(createFakeUser());
  }

  return users.sort((userA, userB) => userA.name.localeCompare(userB.name));
}
