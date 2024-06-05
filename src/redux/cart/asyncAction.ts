import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CARTS_URL } from '../../constants/urls';
import { RootState } from '../store';
import { CartItem } from './types';
import {timer} from '../../utils/timer';

export const fetchGetProductCard = createAsyncThunk(
    'cart/fetchGetProductCard',
    async function (_, { rejectWithValue }) {
      try {
        const { data } = await axios.get<CartItem[]>(`${CARTS_URL}`);
        console.log(data)
        return data;
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        } else {
          return rejectWithValue('An unknown error occurred');
        }
      }
    }
  );

export const fetchAddProductCard = createAsyncThunk(
    'cart/fetchAddProductCard',
    async function(item: CartItem, { rejectWithValue })   {
        try{
            const {data} = await axios.post<CartItem>(CARTS_URL, item)
            return data;
        }catch(error){
            if(error instanceof Error){
                return rejectWithValue(error.message)
            }else{
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
);

export const fetchUpdateProductCard = createAsyncThunk(
    'cart/fetchUpdateProductCard',
    async function (item: CartItem, { rejectWithValue }) {
      try {
        const { data } = await axios.put<CartItem>(`${CARTS_URL}/${item.id}`,item, {
            headers: {
                'Content-Type': 'application/json',
              },
        });
        return data;
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        } else {
          return rejectWithValue('An unknown error occurred');
        }
      }
    }
  );

  export const fetchDeleteProductCard = createAsyncThunk(
    'cart/fetchDeleteProductCard',
    async function (id: string | undefined, { rejectWithValue }) {
      try {
        const { data } = await axios.delete(`${CARTS_URL}/${id}`);
        console.log(data)
        return data;
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        } else {
          return rejectWithValue('An unknown error occurred');
        }
      }
    }
  );



    // export const fetchDeleteAllProductCards = createAsyncThunk(
    //     'cart/fetchDeleteAllProductCards',
    //     async function (_, {rejectWithValue, getState}){
    //         try{
    //         const state = getState() as RootState;
    //         const cards = state.cart.items;
    //         const deletePromises = [];
    //         for (let i = 0; i < cards.length; i++) {
    //             await timer(100); // Подождать 2 секунды перед каждым запросом
    //             console.log('delete card ' + i);
    //             deletePromises.push(await axios.delete(`${CARTS_URL}/${cards[i].id}`));
    //         }

    //         await Promise.all(deletePromises)
    //         return 'All records deleted successfully'

    //     }catch(error){
    //         if(error instanceof Error){
    //             return rejectWithValue(error.message);
    //         }else {
    //             return rejectWithValue('An unknown error occurred');
    //         }
    //     }
    // }
    // )

    export const fetchDeleteAllProductCards = createAsyncThunk(
        'cart/fetchDeleteAllProductCards',
        async function (_, {rejectWithValue, dispatch, getState}){
            try{
            const state = getState() as RootState;
            const cards = state.cart.items;
            for (let i = 0; i < cards.length; i++) {
                await timer(100); 
                console.log('delete card ' + i);
                await dispatch(fetchDeleteProductCard(cards[i].id));
            }

        }catch(error){
            if(error instanceof Error){
                return rejectWithValue(error.message);
            }else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
    )
    



  