import {useState} from 'react';
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

    const resultsPerPage = 10;
    const [page, setPage] = useState(1);

    const {data, isLoading, error} = useSWR(`api/people?page=${page}`, fetcher);
    let [firstElIndex, setFirstElIndex] = useState(1);
    let [lastElIndex, setLastElIndex] = useState(resultsPerPage);

    if (error) {
        return <h1>{error.message}</h1>;
    }
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    const people: User[] = data.people;
    const total = data.totalNumber;
    const maxPage = Math.ceil(total / resultsPerPage);

    function handlePagination(pageDelta: number) {
        if (page == 1 && pageDelta < 0) return () => {};
        if (page + pageDelta > maxPage) return () => {};

        return () => {
            setPage(page + pageDelta);
            setFirstElIndex(firstElIndex + resultsPerPage * pageDelta);

            let nextLastIndex = lastElIndex;
            if (lastElIndex % resultsPerPage !== 0) {
                nextLastIndex += people.length * pageDelta; // substract/add the visible number of objects on the page if not on full page
            } else {
                nextLastIndex += resultsPerPage * pageDelta; // subtract/add the specified number if on full page
            }
            if (nextLastIndex > total) nextLastIndex = total;

            setLastElIndex(nextLastIndex);
        };
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
                                    <span className="font-medium">
                                        {firstElIndex}
                                    </span>{' '}
                                    to{' '}
                                    <span className="font-medium">
                                        {lastElIndex}
                                    </span>{' '}
                                    of{' '}
                                    <span className="font-medium">{total}</span>{' '}
                                    results
                                </p>
                            </div>
                            <div className="flex flex-1 justify-between sm:justify-end">
                                <a
                                    onClick={handlePagination(-1)}
                                    href="#"
                                    className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                                >
                                    Previous
                                </a>
                                <a
                                    onClick={handlePagination(1)}
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
