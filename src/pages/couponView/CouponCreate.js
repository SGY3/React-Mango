import { useState, useContext } from "react";
import axios from "axios";
import endpoints from "../../api/endpoints";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const CouponCreate = () => {
    const { token } = useContext(AuthContext);
    const [couponData, setCouponData] = useState({ couponCode: "", discountAmount: "", minAmount: "" });
    const navigate = useNavigate();

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
            const response = await axios.post(endpoints.coupon.save, couponData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.isSuccess) {
                toast.success("Coupon created successfully! 🎉");
                navigate("/coupon");
            }
            else {
                toast.error("Failed to create coupon.");
            }
        }
        catch (err) {
            toast.error("An error occurred while creating coupon.");
        }
    };
    return (
        <div className="container border p-3">
            <h1 className="text-center">Create Coupon</h1>
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
                            onChange={handleChange}
                            required></input>
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
                            onChange={handleChange}
                            required></input>
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
                            onChange={handleChange}
                            required></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-5 offset-2">
                        <button className="btn btn-primary" onClick={() => navigate("/coupon")}>Back to List</button>
                    </div>
                    <div className="col-5">
                        <button type="submit" className="btn btn-success">Create Coupon</button>

                    </div>

                </div>
            </form>
        </div>

    );

};

export default CouponCreate;