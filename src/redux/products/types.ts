

export type Products = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;
}

export type SearchProductsParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
  };

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
}

export interface ProductsSliceState {
    items:Products[];
    status: Status;
}