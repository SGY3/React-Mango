import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import endpoints from "../api/endpoints";
import { AuthContext } from "../context/AuthContext";

const Coupon = () => {
    const [coupons, setCoupons] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    // Fetch coupon when the component is mounted
    useEffect(() => {
        const fetchCoupon = async () => {
            try {
                const response = await axios.get(endpoints.coupon.getAll, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.isSuccess) {
                    //console.log(response.data.result);
                    setCoupons(response.data.result);
                }
                else {
                    setError(response.data.message);
                }
            }
            catch (err) {
                setError("Failed to load coupon");
            }
            finally {
                setLoading(false);
            }
        };
        fetchCoupon();
    }, []);

    if (loading) return <div>Loading...</div>

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Coupon List</h2>
            {/* Display error if there is any */}
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="text-end">
                <button className="btn btn-outline-primary"
                    onClick={() => navigate(`/coupon/createCoupon`)}><i className="bi bi-plus-square"></i> Create Coupon</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Coupon Code
                        </th>
                        <th>
                            Discount Amount
                        </th>
                        <th>
                            Minimum Amount
                        </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map((coupon) => (
                        <tr key={coupon.couponId}>
                            <td>{coupon.couponCode}</td>
                            <td>₹{coupon.discountAmount}</td>
                            <td>₹{coupon.minAmount}</td>
                            <td>
                                <button className="btn btn-primary"
                                    onClick={() => navigate(`/coupon/couponEdit/${coupon.couponId}`)}>
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <span className="mx-2"></span>
                                <button className="btn btn-danger"
                                    onClick={() => navigate(`/coupon/couponDelete/${coupon.couponId}`)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

};

export default Coupon;