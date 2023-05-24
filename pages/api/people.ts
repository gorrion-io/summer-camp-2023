import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import User from "@/types/User";
import ErrorMessage from "@/types/ErrorMessage";
import { maxAmmountOfUsers, usersPerPage, totalPages } from "@/constants/main";

const generateUsers = (numberOfUsers: number): User[] => {
	const users: User[] = [];
	for (let i = 0; i < numberOfUsers; i++) {
		const newUser: User = {
			name: faker.person.fullName(),
			email: faker.internet.email(),
			title: faker.person.jobTitle(),
			role: faker.person.jobType(),
		};

		users.push(newUser);
	}

	return users;
};

const allUsers: User[] = generateUsers(maxAmmountOfUsers);

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<User[] | ErrorMessage>
) {
	const { page = "1" } = req.query;
	const pageNumber = parseInt(page as string, 10);

	if (pageNumber <= 0 || pageNumber > totalPages) {
		res.status(400).json({ name: "Invalid page number" });
		return;
	}

	const firstIndex = (pageNumber - 1) * usersPerPage;
	const lastIndex = firstIndex + usersPerPage;

	const users = allUsers
		.sort((a, b) => a.name.localeCompare(b.name))
		.slice(firstIndex, lastIndex);

	res.status(200).json(users);
}
