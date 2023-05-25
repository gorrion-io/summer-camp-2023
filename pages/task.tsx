import useSWR from 'swr';

const fetcher = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        const error = new Error('An error occured during data fetching');
        throw error;
    }

    return response.json();
};

export default function Task() {
    /**  TODO: Create an endpoint that returns a list of people, and use that here.
     * Use tanstack/react-query to fetch the data
     */

    let page = 10;
    const {data, error, isLoading} = useSWR(
        `/api/people?page=${page}`,
        fetcher
    );

    if (isLoading) {
        return <h1>Loading</h1>;
    }
    if (error) {
        return <h1>{error.message}</h1>;
    }

    const people: User[] = data;
    if (people.length === 0) {
        return <h1>People list is empty</h1>;
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
                                    <th
                                        scope="col"
                                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {people.map(person => (
                                    <tr key={person.email}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                            {person.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                            {person.title}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                            {person.email}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                            {person.role}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* TODO: Pagination */}
                        <nav
                            className="flex items-center justify-between py-3"
                            aria-label="Pagination"
                        >
                            <div className="hidden sm:block">
                                <p className="text-sm">
                                    Showing{' '}
                                    <span className="font-medium">1</span> to{' '}
                                    <span className="font-medium">1</span> of{' '}
                                    <span className="font-medium">N</span>{' '}
                                    results
                                </p>
                            </div>
                            <div className="flex flex-1 justify-between sm:justify-end">
                                <a
                                    href="#"
                                    className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                                >
                                    Previous
                                </a>
                                <a
                                    href="#"
                                    className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
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
