export interface IUserSchema {
    name:string,
    email:string,
    password:string,
    role:"admin" | "user",
    createdAt:Date
}