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

	const users = generateUsers(maxAmmountOfUsers)
		.slice(firstIndex, lastIndex)
		.sort((a, b) => a.name.localeCompare(b.name));

	res.status(200).json(users);
}
