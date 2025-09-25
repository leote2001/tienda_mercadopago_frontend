import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../products/productsSlice";

interface CartItem extends Product {
    quantity: number;
}
interface CartState {
    items: CartItem[];
    total: number;
}
const initialState: CartState = {
    items: [],
    total: 0
}
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            const exists = state.items.find((p) => p.id === product.id);
            if (exists) {
                exists.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
            state.total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            state.items = state.items.filter((p) => p.id !== productId);
            state.total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            const exists = state.items.find((p) => p.id === productId);
            if (!exists) return;
            if (exists.quantity > 1) {
                exists.quantity -= 1;
            } else {
                state.items = state.items.filter((p) => p.id !== exists.id);
            }
            state.total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        }
    }
});
export const {decreaseQuantity, addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 