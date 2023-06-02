import { faker } from "@faker-js/faker";
import { User } from "@/pages/api/people";

function generatePeople(): User {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        title: faker.person.jobTitle(),
        role: faker.helpers.arrayElement(['User', "Admin"])
      }
}

function getUsers(numUsers: number) {
    return sortAscOrder(faker.helpers.multiple(generatePeople, {count: numUsers}));
}
  
function sortAscOrder(users: User[]) {
    return users.sort(function(a ,b) {
    var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
    if(nameA < nameB) return -1;
    if(nameA > nameB) return 1;
    return 0;
})
}

export async function fetchUsers(page: number): Promise<User[]> {
    const fakeUsers = await fetch(`/api/people?currentPage=${page}`)
    return fakeUsers.json(); 
} 

export default getUsers;