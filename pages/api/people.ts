import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from '@faker-js/faker';

type User = {
  name: string;
  email: string;
  title: string;
  role: string;
};

const PEOPLE_PER_PAGE = 10;
const NUMBER_OF_PEOPLE = 200;

function getUser() : User{
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    title: faker.person.jobTitle(),
    role: faker.person.jobType()
  };
}

const people = faker.helpers.multiple(getUser, {
  count: NUMBER_OF_PEOPLE
})
.sort((a : Object, b : Object) => a.name.localeCompare(b.name));

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const { page = 0 } = req.query;
  const start = page * PEOPLE_PER_PAGE;
  const end = start + PEOPLE_PER_PAGE;

  res.status(200).json({
    data : people.slice(start, end),
    PEOPLE_PER_PAGE,
    NUMBER_OF_PEOPLE
  }
  );
}