import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import endpoints from "../../api/endpoints";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const ProductEdit = () => {
    const [productData, setProductData] = useState({ name: "", price: "", description: "", categoryName: "", imageUrl: "" });
    const navigate = useNavigate();
    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(endpoints.product.getById(id));
                if (response.data.isSuccess) {
                    setProductData(response.data.result);
                }
                else {
                    toast.error(response.data.message);
                }
            }
            catch (err) {
                console.log(err);
                toast.error("An error occurred while loading coupon details.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(endpoints.product.save, productData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.isSuccess) {
                toast.success("Product Updated Successfully!");
                navigate('/ProductIndex');
            }
            else {
                toast.error(response.data.message);
            }
        }
        catch (err) {
            console.log(err);
            toast.error('Somthing went wrong. Please try again.');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container border p-3" style={{ maxWidth: "600px" }}>
            <h1 className="text-center">Create Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                        className="form-control"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Price:</label>
                    <input
                        className="form-control"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        rows={4}
                        required
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Category:</label>
                    <input
                        className="form-control"
                        name="categoryName"
                        value={productData.categoryName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Image URL:</label>
                    <input
                        className="form-control"
                        name="imageUrl"
                        value={productData.imageUrl}
                        onChange={handleChange}
                    />
                </div>

                <div className="d-flex justify-content-center">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate('/ProductIndex')}
                    >
                        Back to List
                    </button>
                    <span className="mx-2"></span>
                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductEdit;