import { User } from "../pages/api/people";

function paginate(items: User[], pageNumber: number, pageSize: number): User[] {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
}

export default paginate;