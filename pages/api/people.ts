import type {NextApiRequest, NextApiResponse} from 'next';
import fs from 'fs';

type User = {
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

const FILE_PATH = 'dev-data/people.json';
const RESULTS_PER_PAGE = 10;

// Import sample data from file
let users: User[];
try {
    users = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
} catch {
    console.log('File containing sample user data not found');
    users = [];
}

class AppError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

// Sort the users by name (ascending order)
users.sort((userA, userB) => {
    if (userA.name > userB.name) return 1;
    return -1;
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // If user does not specify page parameter, the first page will be selected
        // Errors are thrown when the page passed by the user cannot be processed correctly
        const page = Number.parseInt(String(req.query.page)) || 1;
        if (page < 1) {
            throw new AppError('Page must be a natural number', 400);
        }
        const toSkip = (page - 1) * RESULTS_PER_PAGE;
        if (toSkip > users.length) {
            throw new AppError('This page does not exist', 404);
        }

        const result = users.slice(toSkip, toSkip + RESULTS_PER_PAGE);
        res.status(200).json({
            people: result,
            totalNumber: users.length,
            firstElementIndex: toSkip + 1,
            lastElementIndex: toSkip + result.length
        });
    } catch (err: any) {
        console.log(err.message);
        res.status(err.statusCode).json({
            status: 'fail',
            message: err.message,
        });
    }
}
