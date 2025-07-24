export interface IUser {
    name:     string;
    email:    string;
    password: string;
    rol: 
    | "admin"
    | "user"
    | "guest"
}
