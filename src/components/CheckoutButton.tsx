import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../features/cart/cartSelectors";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export function CheckoutButton() {
    const [init_point, setInit_Point] = useState(null);
    const cartItems = useSelector(selectCartItems);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getInit_Point = async () => {
            setError(null);
            setInit_Point(null);
            try {
    const response = await axios.post(`${apiUrl}/checkout/create_preference`, {products: cartItems});
    const data = response.data.init_point;
    setInit_Point(data);
    /*eslint-disable-next-line*/
            } catch (err: any) {
                setError(err.message);
            }
        }    
        getInit_Point();
    }, [cartItems]);
    return (
        <>
        {!error && init_point ?
            <Button component="a" href={init_point} target="_blank" rel="noopener noreferrer" variant="outlined">Ir al checkout</Button>
            :
            <p>{error}</p>
        }
        </>
    );
}