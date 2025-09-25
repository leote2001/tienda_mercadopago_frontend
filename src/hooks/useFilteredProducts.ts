import type { Product } from "../features/products/productsSlice";
import { useMemo } from "react";

export interface Filters {
    category: string;
    priceRange: [number, number];
    search: string;
}
export const useFilteredProducts = (products: Product[], filters: Filters) => {
return useMemo(() => {
    return products
    .filter(p => filters.category === "" || p.category === filters.category)
    .filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])
    .filter(p => p.title.toLowerCase().includes(filters.search.toLowerCase()) || !filters.search)
}, [products, filters])
}