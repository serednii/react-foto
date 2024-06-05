import { Status } from '../types'

export type CartItem = {
    id?: string;
    currentId?: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
}

export interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
    status: Status;
}