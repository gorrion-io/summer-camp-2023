import type { NextApiRequest, NextApiResponse } from "next";
import paginate from "../../utils/paginate";
import getUsers from "@/utils/helper_functions";
import {NUM_USERS, PER_PAGE} from "../../config_params"

export type User = {
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

const users = getUsers(NUM_USERS);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {  
  const query = req.query;
  const page = Number(query.currentPage);
  const usersFinal = paginate(users, page, PER_PAGE);
  
  res.status(200).json(usersFinal);
}
