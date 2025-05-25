import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import endpoints from "../api/endpoints";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const CartIndex = () => {
    const { user, token, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user?.id) {
            toast.error('User is not authenticated');
            logout();
            navigate('/login');
            return;
        }
        const fetchCart = async () => {
            const response = await axios.get(endpoints.cart.getCart(user.id));
            console.log(response);
        };
        fetchCart();
    }, []);

}

export default CartIndex;