import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

export const selectCartItems = ((state: RootState) => state.cart.items);

export const selectCartTotal = createSelector ([selectCartItems], (items) => {
    return items.reduce((acc, i) => acc + i.price * i.quantity, 0);
});
export const selectCartCount = createSelector ([selectCartItems], (items) => {
    return items.reduce((acc, i) => acc + i.quantity, 0);
});