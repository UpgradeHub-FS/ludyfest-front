import { IUser } from './IUser';

export interface IUpdateUserResponse {
    success: boolean;
    message: string;
    user: IUser;
}