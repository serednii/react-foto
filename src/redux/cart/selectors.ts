import { castDraft } from 'immer';
import { RootState } from '../store';

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemById = (currentId: string) => (state: RootState) => 
        state.cart.items.find((obj) => obj.currentId === currentId)

export const selectFindCart = (id: string) => (state: RootState) =>
        state.cart.items.find(cart => cart.id === id)