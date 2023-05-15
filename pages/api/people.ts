import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import Joi from "joi";

export type User = {
  name: string;
  email: string;
  title: string;
  role: string;
};

export type PeopleResponse = { peoples: User[]; total: number };

const peoples: User[] = new Array(
  Math.max(
    +(
      process.env.PEOPLE_LENGTH ||
      //undefined
      0
    ) ||
      // Nan
      0,
    100
  )
)
  .fill(0)
  .map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    title: faker.person.jobTitle(),
    role: faker.helpers.arrayElement(["Admin", "User"]),
  }));

const reqSchema = Joi.object<{ query: { page: number } }>({
  query: Joi.object({
    page: Joi.number().integer().min(0),
  }),
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PeopleResponse | { errors: string[] }>
) {
  const { query, cookies, body } = req;
  const validationResult = reqSchema.validate(
    { query, cookies, body },
    { stripUnknown: true }
  );

  if (validationResult.error) {
    res.status(400).json({
      errors: validationResult.error.details.map(({ message }) => message),
    });
  } else {
    const { page } = validationResult.value.query;

    const pageSize = 10;

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    res.status(200).json({
      peoples: peoples
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(startIndex, endIndex),
      total: peoples.length,
    });
  }
}
