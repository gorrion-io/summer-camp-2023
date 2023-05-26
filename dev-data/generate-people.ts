const fs = require('fs');
const {faker} = require('@faker-js/faker');

const FILE_PATH = 'dev-data/people.json';

// Determine the amount of data to generate from npm script execution parameters
// If user doesn't specify the number (or the number he passed is too small), 100 objects will be generated.
let userInput = process.env.npm_config_people || '100';
let recordsToGenerate = Number.parseInt(userInput);
recordsToGenerate = recordsToGenerate >= 100 ? recordsToGenerate : 100;

// Generate data and save to file at once
type User = {
    name: string;
    email: string;
    title: string;
    role: string;
};
fs.writeFileSync(FILE_PATH, '[');
for (let i = 0; i < recordsToGenerate; i++) {
    const newUser: User = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        title: faker.person.jobTitle(),
        role: faker.helpers.arrayElement(['admin', 'mod', 'user']),
    };
    fs.appendFileSync(
        FILE_PATH,
        JSON.stringify(newUser) + (i === recordsToGenerate - 1 ? '' : ',')
    ); // Add comma to the end of every object except the last one
}
fs.appendFileSync(FILE_PATH, ']');

console.log(
    `${recordsToGenerate} user objects generated and saved to ${FILE_PATH}`
);
