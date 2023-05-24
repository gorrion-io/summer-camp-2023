import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import User from "@/types/User";
import { maxAmmountOfUsers, usersPerPage, totalPages } from "@/constants/main";

const getUsers = async (pageNumber: number) => {
	const response = await fetch(`./api/people?page=${pageNumber}`);
	if (!response.ok)
		throw new Error("Error connecting to database, please try again later.");

	const data = await response.json();
	return data;
};

export default function Task() {
	const [pageNumber, setPageNumber] = useState(1);
	const queryClient = useQueryClient();

	const {
		isLoading,
		error,
		data: users,
	} = useQuery({
		queryKey: ["users", pageNumber],
		queryFn: () => getUsers(pageNumber),
	});

	const firstIndex = (pageNumber - 1) * usersPerPage;
	const lastIndex = firstIndex + usersPerPage;

	const prevPageClickHanlder = () => {
		setPageNumber(prevPageNumber => {
			if (prevPageNumber === 1) return prevPageNumber;
			return prevPageNumber - 1;
		});
	};

	const nextPageClickHanlder = () => {
		setPageNumber(prevPageNumber => {
			if (prevPageNumber === totalPages) return prevPageNumber;
			return prevPageNumber + 1;
		});
	};

	let usersList,
		emptyList = [];

	if (isLoading) {
		for (let i = 0; i < usersPerPage; i++) {
			emptyList.push(
				<tr key={i}>
					<td className="whitespace-nowrap py-6 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"></td>
					<td className="whitespace-nowrap px-3 py-6 text-sm text-gray-300"></td>
					<td className="whitespace-nowrap px-3 py-6 text-sm text-gray-300"></td>
					<td className="whitespace-nowrap px-3 py-6 text-sm text-gray-300"></td>
				</tr>
			);
		}
	}

	if (error)
		return <p>Error connecting to database, please try again later.</p>;

	if (users) {
		usersList = users.map((user: User) => (
			<tr key={user.email}>
				<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
					{user.name}
				</td>
				<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
					{user.title}
				</td>
				<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
					{user.email}
				</td>
				<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
					{user.role}
				</td>
			</tr>
		));
	}

	return (
		<div className="mx-auto max-w-7xl">
			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table className="min-w-full divide-y divide-gray-700">
							<thead>
								<tr>
									<th
										scope="col"
										className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
									>
										Name
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-white"
									>
										Title
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-white"
									>
										Email
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-white"
									>
										Role
									</th>
									<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
										<span className="sr-only">Edit</span>
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-800">
								{isLoading ? emptyList : usersList}
							</tbody>
						</table>
						<nav
							className="flex items-center justify-between py-3"
							aria-label="Pagination"
						>
							<div className="hidden sm:block">
								<p className="text-sm">
									Showing <span className="font-medium">{firstIndex + 1}</span>{" "}
									to <span className="font-medium">{lastIndex}</span> of{" "}
									<span className="font-medium">{maxAmmountOfUsers}</span>{" "}
									results
								</p>
							</div>
							<div className="flex flex-1 justify-between sm:justify-end">
								<a
									href="#"
									className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
									onClick={prevPageClickHanlder}
								>
									Previous
								</a>
								<a
									href="#"
									className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
									onClick={nextPageClickHanlder}
								>
									Next
								</a>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
}
