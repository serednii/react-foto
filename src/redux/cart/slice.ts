import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { CartItem, CartSliceState } from './types';
import { fetchAddProductCard, fetchUpdateProductCard, fetchGetProductCard, fetchDeleteProductCard } from './asyncAction';
import { Status } from '../types';

const initialState: CartSliceState  = {
    status: Status.LOADING,
    items: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
 
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetProductCard.pending, (state) => {
        state.status = Status.LOADING;
    })
    builder.addCase(fetchAddProductCard.pending, (state) => {
        state.status = Status.LOADING;
    })
    builder.addCase(fetchUpdateProductCard.pending, (state) => {
        state.status = Status.LOADING;
    })
    builder.addCase(fetchDeleteProductCard.pending, (state) => {
        state.status = Status.LOADING;
    })
    builder.addCase(fetchGetProductCard.fulfilled, (state, action:PayloadAction<CartItem[]>) => {
        state.status = Status.SUCCESS;
        state.items = action.payload
        state.totalPrice = calcTotalPrice(state.items);
    })
    builder.addCase(fetchAddProductCard.fulfilled, (state, action:PayloadAction<CartItem>) => {
        state.status = Status.SUCCESS;
        state.items.push(action.payload);
        state.totalPrice = calcTotalPrice(state.items);
    })
    builder.addCase(fetchUpdateProductCard.fulfilled, (state, action: PayloadAction<CartItem>) => {
        state.status = Status.SUCCESS;
        const findItem = state.items.find((obj) => obj.currentId === action.payload.currentId);
        if (findItem) {
            findItem.count = action.payload.count;
        }
        state.totalPrice = calcTotalPrice(state.items);
    })
    builder.addCase(fetchDeleteProductCard.fulfilled, (state, action:PayloadAction<CartItem>) => {
        state.status = Status.SUCCESS;
        state.items = state.items.filter((item) => item.currentId !== action.payload.currentId )
        state.totalPrice = calcTotalPrice(state.items);
    })
    builder.addCase(fetchGetProductCard.rejected, (state) => {
        state.status = Status.ERROR;
    })
    builder.addCase(fetchAddProductCard.rejected, (state) => {
        state.status = Status.ERROR;
    })
    builder.addCase(fetchUpdateProductCard.rejected, (state) => {
        state.status = Status.ERROR;
    })
    builder.addCase(fetchDeleteProductCard.rejected, (state) => {
        state.status = Status.ERROR;
    })
}
});



export default cartSlice.reducer;