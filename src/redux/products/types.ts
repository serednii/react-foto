import { Status } from '../types';

export type Products = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;
    currentId: string;
}

export type SearchProductsParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
  };

export interface ProductsSliceState {
    items:Products[];
    status: Status;
}