import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Products, SearchProductsParams } from './types';
import { PRODUCTS_URL } from '../../constants/urls';

export const fetchProducts = createAsyncThunk<Products[]>(
    'products/fetchProducts',
    async function(_, { rejectWithValue })   {
        try{
            const {data} = await axios.get<Products[]>(PRODUCTS_URL)
            return data;
        }catch(error){
            if(error instanceof Error){
                return rejectWithValue(error.message)
            }else{
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
)