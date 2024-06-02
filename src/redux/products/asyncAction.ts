import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Products, SearchProductsParams } from './types';
import { PRODUCTS_URL } from '../../constants/urls';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

export const fetchProducts = createAsyncThunk<Products[], SearchProductsParams>(
    'products/fetchProducts',
    async function(params, { rejectWithValue })   {
        const { sortBy, order, category, search, currentPage } = params;
        try{
            const {data} = await axios.get<Products[]>(PRODUCTS_URL,{
                params: pickBy(
                    {
                        page: currentPage,
                        limit: 4,
                        category,
                        sortBy,
                        order,
                        search,
                    },
                    identity,
                )
            })
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