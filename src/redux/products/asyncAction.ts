import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Products, SearchProductsParams } from './types';

export const fetchProducts = createAsyncThunk<Products[], SearchProductsParams>(
    'products/fetchProductsStatus',
    async () =>  {
        const {data} = await axios.get<Products[]>(`https://6606a11ebe53febb857e51e7.mockapi.io/items` )
        return data
    }
)