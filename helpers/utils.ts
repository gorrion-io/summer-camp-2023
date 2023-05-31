import { faker } from "@faker-js/faker";
import { User } from "@/helpers/types";

export function createUser(): User {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    title: faker.person.jobTitle(),
    role: faker.person.jobType(),
  };
}

export function getRandomUsers(n: number): User[] {
  return new Array(n).fill(0).map(createUser);
}
