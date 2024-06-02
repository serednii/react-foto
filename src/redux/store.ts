import {configureStore}from '@reduxjs/toolkit';
import products from './products/slice';
import { useDispatch } from 'react-redux';
import filter from './filter/slice';
import cart from './cart/slice'
export const store = configureStore({
    reducer: {
        products,
        filter,
        cart,
    }
})

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch =  typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();