import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import endpoints from "../api/endpoints";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const CartIndex = () => {
    const { user, token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [cart, setCart] = useState(null);
    const [coupon, setCoupon] = useState('');
    const [loading, setLoading] = useState(true);
    const couponInputRef = useRef(null);

    const fetchCart = async () => {
        if (!user?.id || !token) return;

        setLoading(true);
        try {
            const response = await axios.get(endpoints.cart.getCart(user.id), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.isSuccess) {
                const result = response.data.result;
                console.log(result);
                setCart(result);
                setCoupon(result.cartHeader.couponCode || "");
            } else {
                setCart(null);
                //toast.error("Failed to load cart");
            }
        } catch (err) {
            toast.error("Error fetching cart");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user?.id) {
            toast.error('User is not authenticated');
            logout();
            navigate('/login');
        } else {
            fetchCart();
        }
    }, [user?.id, token]);

    const handleRemoveItem = async (cartDetailsId) => {
        try {
            await axios.post(endpoints.cart.removeFromCart, cartDetailsId, {
                headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            toast.success("Item removed");
            fetchCart();
        } catch (err) {
            toast.error("Error removing item");
            console.error(err);
        }
    };

    const handleApplyCoupon = async () => {
        try {
            if (coupon === '') {
                toast.warning('Enter Coupon Code');
                couponInputRef.current?.focus();
                return;
            }
            const payload = {
                cartHeader: {
                    userId: user.id,
                    couponCode: coupon
                },
                cartDetails: null // optional, but include it if your DTO requires it
            };
            await axios.post(endpoints.cart.applyCoupon, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Coupon applied");
            fetchCart();
        } catch (err) {
            toast.error("Failed to apply coupon");
        }
    };

    const handleRemoveCoupon = async () => {
        try {
            const payload = {
                cartHeader: {
                    userId: user.id,
                    couponCode: ''
                },
                cartDetails: null // optional, but include it if your DTO requires it
            };
            const response = await axios.post(endpoints.cart.applyCoupon, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = response.data;
            console.log(result, payload);
            toast.success("Coupon removed");
            fetchCart();
        } catch (err) {
            toast.error("Failed to remove coupon");
        }
    };

    const handleEmailCart = async () => {
        try {
            await axios.post(endpoints.cart.emailCart, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Cart emailed!");
        } catch (err) {
            toast.error("Failed to email cart");
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Loading cart...</div>;
    }

    if (!cart || !cart.cartDetails || cart.cartDetails.length === 0) {
        return <div className="text-center mt-5">Please add items to cart.</div>;
    }

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                    <h3><i className="bi bi-cart"></i> Shopping Cart</h3>
                    <button className="btn btn-warning btn-sm" onClick={() => navigate("/")}>
                        Continue Shopping
                    </button>
                </div>

                <div className="card-body">
                    <div className="d-none d-lg-flex text-info fw-bold mb-2">
                        <div className="col-lg-2" />
                        <div className="col-lg-5">Product Details</div>
                        <div className="col-lg-2">Price</div>
                        <div className="col-lg-2">Count</div>
                        <div className="col-lg-1" />
                    </div>

                    {cart.cartDetails.map((item) => (
                        <div className="row align-items-center mb-3" key={item.cartDetailsId}>
                            <div className="col-4 col-md-2 text-center">
                                <img src={item.product.imageUrl} alt={item.product.name} className="img-fluid rounded" />
                            </div>
                            <div className="col-8 col-md-5">
                                <h5>{item.product.name}</h5>
                                <div dangerouslySetInnerHTML={{ __html: item.product.description }} style={{ fontSize: "11px" }} />
                            </div>
                            <div className="col-3 col-md-2">
                                <span style={{ fontSize: "17px" }}>₹{item.product.price.toFixed(2)}</span>
                            </div>
                            <div className="col-3 col-md-2">
                                <span style={{ fontSize: "17px" }}>{item.count}</span>
                            </div>
                            <div className="col-2 col-md-1 text-center">
                                <button className="btn btn-sm btn-danger" onClick={() => handleRemoveItem(item.cartDetailsId)}>
                                    <i className="bi bi-trash-fill"></i>
                                </button>
                            </div>
                        </div>
                    ))}

                    <hr />

                    <div className="row mb-3">
                        <div className="col-6">
                            <label>Coupon:</label>
                            {cart.cartHeader.couponCode ? (
                                <>
                                    <input className="form-control d-inline w-50" value={coupon} disabled />
                                    <button onClick={handleRemoveCoupon} className="btn btn-success btn-sm ms-2">Remove</button>
                                </>
                            ) : (
                                <>
                                    <input
                                        ref={couponInputRef}
                                        className="form-control d-inline w-50"
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)}
                                    />
                                    <button onClick={handleApplyCoupon} className="btn btn-success btn-sm ms-2">Apply</button>
                                </>
                            )}
                        </div>

                        <div className="col-6 text-end">
                            <span className="text-danger fw-bold fs-5">
                                Order Total: ₹{cart.cartHeader.cartTotal.toFixed(2)} <br />
                            </span>
                            {cart.cartHeader.discount > 0 && (
                                <span className="text-success">
                                    Order Discount: ₹{cart.cartHeader.discount.toFixed(2)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="card-footer row">
                    <div className="col-6 col-md-3">
                        <button onClick={handleEmailCart} className="btn btn-outline-danger w-100">Email Cart</button>
                    </div>
                    <div className="col-6 col-md-3 offset-md-6">
                        <button disabled className="btn btn-success w-100">Checkout (Coming Soon!)</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartIndex;
