import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsSliceState } from "./types";
import { Products } from "./types";
import {Status} from '../types';
import {fetchProducts} from './asyncAction';

const initialState: ProductsSliceState = {
    items: [],
    status: Status.LOADING,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{
        setItems(state, action: PayloadAction<Products[]>){
            state.items = action.payload;
        }
    }, 
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.items = action.payload;
        })
        builder.addCase(fetchProducts.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        })
    }
})

export default productsSlice.reducer;