import { useState, useContext, useEffect } from "react";
import axios from "axios";
import endpoints from "../../api/endpoints";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const CouponDelete = () => {
    const { token } = useContext(AuthContext);
    const { id } = useParams();
    const [couponData, setCouponData] = useState({ couponId: 0, couponCode: "", discountAmount: "", minAmount: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCoupon = async () => {
            try {
                const response = await axios.get(endpoints.coupon.getById(id), {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.isSuccess) {
                    setCouponData(response.data.result);
                }
                else {
                    toast.error(response.data.message);
                }
            }
            catch (err) {
                console.log(err);
                toast.error("An error occurred while loading coupon details.");
            }
        };
        fetchCoupon();
    }, [id]);

    const handleChange = (e) => {
        setCouponData({
            ...couponData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(couponData);
            const response = await axios.delete(endpoints.coupon.delete(id), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.isSuccess) {
                toast.success("Coupon Deleted successfully! 🎉");
                navigate("/coupon");
            }
            else {
                toast.error(`Failed to delete coupon. ${response.data.message}`);
            }
        }
        catch (err) {
            toast.error("An error occurred while creating coupon.");
        }
    };
    return (
        <div className="container border p-3">
            <h1 className="text-center">Delete Coupon</h1>
            <form onSubmit={handleSubmit}>
                <div className="row mb-2">
                    <div className="col-2">
                        <label className="control-label">Coupon Code</label>
                    </div>
                    <div className="col-10">
                        <input type="text"
                            className="form-control"
                            name="couponCode"
                            value={couponData.couponCode}
                            disabled></input>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-2">
                        <label className="control-label">Discount Amount</label>
                    </div>
                    <div className="col-10">
                        <input type="text"
                            className="form-control"
                            name="discountAmount"
                            value={couponData.discountAmount}
                            disabled></input>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-2">
                        <label className="control-label">Minimum Amount</label>
                    </div>
                    <div className="col-10">
                        <input type="text"
                            className="form-control"
                            name="minAmount"
                            value={couponData.minAmount}
                            disabled></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-5 offset-2">
                        <button type="button" className="btn btn-primary" onClick={() => navigate("/coupon")}>Back to List</button>
                    </div>
                    <div className="col-5">
                        <button type="submit" className="btn btn-danger">Delete Coupon</button>

                    </div>

                </div>
            </form>
        </div>

    );

};

export default CouponDelete;