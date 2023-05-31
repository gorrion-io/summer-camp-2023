export const USERS_PER_PAGE = 10;
export const NUM_OF_USERS = 123;
export const NUM_OF_PAGES =
  Math.ceil(NUM_OF_USERS / USERS_PER_PAGE) < 10
    ? 10
    : Math.ceil(NUM_OF_USERS / USERS_PER_PAGE);
