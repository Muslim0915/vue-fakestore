import type { IProduct } from './index';

export interface IUserAuth {
    email: string;
    orders: IProduct[];
    uid: string;
    username: string;
}
