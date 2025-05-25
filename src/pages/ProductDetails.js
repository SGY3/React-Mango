import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import endpoints from "../api/endpoints";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // get productId from the URL
    const [product, setProduct] = useState(null);
    const [count, setCount] = useState(1);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { user, token, logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${endpoints.product.getById(id)}`);
                if (response.data.isSuccess) {
                    setProduct(response.data.result);
                } else {
                    setError(response.data.message || "Failed to load product.");
                }
            } catch (err) {
                setError("Error loading product.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if (!user?.id) {
            toast.error('User is not authenticated');
            logout();
            navigate('/login');
            return;
        }
        try {
            const cartPayload = {
                cartHeader: {
                    userId: user.id
                },
                cartDetails: [
                    {
                        count: parseInt(count),
                        productId: product.productId
                    }
                ]
            };
            console.log(cartPayload);
            const response = await axios.post(endpoints.cart.addToCart, cartPayload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.isSuccess) {
                toast.success('Product added to cart!');
            }
            else {
                toast.error(response.data.message || "Failed to add product to cart.");
            }

        }
        catch (err) {
            console.error(err);
            toast.error("An error occurred while adding to cart.", err);
        }


    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="pt-4">
            <div className="card container border border-secondary">
                <div className="card-header bg-dark text-light row">
                    <div className="col-12 col-md-6">
                        <h1 className="text-white">{product.name}</h1>
                    </div>
                    <div className="col-12 col-md-6 text-end">
                        <h1 className="text-warning">₹{product.price.toFixed(2)}</h1>
                    </div>
                </div>

                <div className="card-body">
                    <div className="container rounded p-2">
                        <div className="row">
                            <div className="col-12 col-lg-4 p-1 text-center">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="rounded"
                                    style={{ borderRadius: "35px", width: "100%" }}
                                />
                            </div>
                            <div className="col-12 col-lg-8">
                                <div className="row ps-3">
                                    <div className="col-12">
                                        <span className="badge bg-primary text-success p-3 border">
                                            {product.categoryName}
                                        </span>
                                        <p className="text-secondary pt-3" dangerouslySetInnerHTML={{ __html: product.description }} />
                                    </div>
                                </div>
                                <div className="row mx-0">
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={count}
                                        onChange={(e) => setCount(e.target.value)}
                                        min="1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-footer row bg-dark">
                    <div className="col-12 col-md-6 pb-1">
                        <button
                            className="btn btn-success form-control btn-lg"
                            style={{ height: "50px" }}
                            onClick={() => navigate("/")}
                        >
                            Back to List
                        </button>
                    </div>
                    <div className="col-12 col-md-6">
                        <button
                            className="btn btn-primary form-control btn-lg"
                            style={{ height: "50px" }}
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
