import { type Dispatch, type SetStateAction } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Slider, TextField, Typography} from "@mui/material";
import type { Filters } from "../hooks/useFilteredProducts";

interface FiltersProps {
filters: Filters;
setFilters: Dispatch<SetStateAction<Filters>>;
categories: string[];    
}
export function FiltersComponent({filters, setFilters, categories}: FiltersProps) {
    return (
        <>
        <Box display="flex" flexDirection="column" gap={3} mb={4}>
        <FormControl fullWidth>
            <InputLabel>Categoría</InputLabel>
            <Select
            name="category"
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            label="Categoría"
            >
<MenuItem value="">Selecciona</MenuItem>
{categories.map((c, index) => (
    <MenuItem key={index} value={c}>{c}</MenuItem>
))}
            </Select>
        </FormControl>
        <Box>
            <Typography gutterBottom>Rango de precios</Typography>
            <Slider
            value={filters.priceRange}
            onChange={(_, value) => setFilters({...filters, priceRange: value as [number, number]})}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            />
        </Box>
        <TextField
        label="Buscar producto"
        name="search"
        value={filters.search}
        onChange={(e) => setFilters({...filters, search: e.target.value})}
        />
        </Box>
        </>
    );
}