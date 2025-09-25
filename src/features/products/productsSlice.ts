import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { getAllProductsUrl, getProductByIdUrl } from "../../constants";
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
}
interface ProductsState {
    items: Product[];
    selectedProduct: Product | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}
export const getAllProducts = createAsyncThunk("products/getAllProducts", async () => {
    const response = await axios.get(getAllProductsUrl);
    const allProducts = response.data;
    return allProducts;
});
export const getProductById = createAsyncThunk("products/getProductById", async (productId: number) => {
    const response = await axios.get(getProductByIdUrl + productId);
    const product = response.data;
    return product;
});
const initialState: ProductsState = {
    items: [],
    selectedProduct: null,
    status: "idle",
    error: null
}
export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Error al obtener productos";
            })
            .addCase(getProductById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedProduct = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Error al obtener producto";
            })
    }
});
export default productsSlice.reducer; 