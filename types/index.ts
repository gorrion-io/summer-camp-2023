export type User = {
    name: string;
    email: string;
    title: string;
    role: string;
  };
  
export type Response = {
    users: User[],
    numOfPages: number
}