import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import endpoints from "../api/endpoints";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch products when the component is mounted
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(endpoints.product.getAll); // Adjust the URL based on your API
                if (response.data.isSuccess) {
                    setProducts(response.data.result);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Handle adding a product to the cart
    const handleAddToCart = async (productId, count) => {
        try {
            const cartData = {
                cartHeader: {
                    userId: localStorage.getItem("userId"), // Assuming you store user info in localStorage
                },
                cartDetails: [
                    {
                        count,
                        productId,
                    },
                ],
            };

            const response = await axios.post("https://localhost:7002/api/cart/upsert", cartData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Assuming JWT token is stored in localStorage
                },
            });

            if (response.data.isSuccess) {
                alert("Item has been added to the Shopping Cart!");
            } else {
                alert(response.data.message || "Failed to add item to cart.");
            }
        } catch (err) {
            alert("An error occurred while adding the product to the cart.");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Home Page</h2>

            {/* Display error if there is any */}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">
                {/* Display list of products */}
                {products.map((product) => (
                    <div key={product.productId} className="col-12 col-md-4">
                        <div className="card mb-4">
                            <h5 className="card-title  text-black-50 text-center py-2">{product.name}</h5>
                            <img
                                src={product.imageUrl}
                                className="card-img-top"
                                alt={product.name}
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <div className="d-flex justify-content-between py-2">
                                    <span className="card-text"><strong>Price: ₹{product.price}</strong></span>
                                    <span className="badge bg-warning text-white p-2"><strong>{product.categoryName}</strong></span>
                                </div>
                                <p
                                    className="card-text"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                ></p>


                                <div className="d-flex justify-content-between align-items-center">
                                    {/* Add to Cart Button */}
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleAddToCart(product.productId, 1)} // Adding 1 item for simplicity
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => navigate(`/product/${product.productId}`)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
