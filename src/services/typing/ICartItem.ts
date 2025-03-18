import { IProduct } from "./IProduct.ts";

export interface ICartItem extends IProduct {
    quantity: number
}