import { useState, useEffect } from "react";
import axios from "axios";
import endpoints from "../../api/endpoints";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

const ProductIndex = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(endpoints.product.getAll);
                if (response.data.isSuccess) {
                    setProducts(response.data.result);
                } else {
                    toast.error(response.data.message);
                }
            } catch (err) {
                console.error(err);
                toast.error("An error occurred while loading product details.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, []);

    const columns = [
        {
            name: "Name",
            selector: row => row.name,
            sortable: true,
        },
        {
            name: "Category Name",
            selector: row => row.categoryName,
            sortable: true,
        },
        {
            name: "Price",
            selector: row => `₹${row.price}`,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="d-flex justify-content-center w-100">
                    <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => navigate(`/ProductEdit/${row.productId}`)}
                    >
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => navigate(`/ProductDelete/${row.productId}`)}
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            ),
            // Removed `center: true` to avoid warning
            sortable: false,
        }
    ];

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Product List</h2>
            <div className="text-end mb-3">
                <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate('/ProductCreate')}
                >
                    <i className="bi bi-plus-square"></i> Create Product
                </button>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <DataTable
                        columns={columns}
                        data={products}
                        pagination
                        highlightOnHover
                        striped
                        responsive
                        persistTableHead
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductIndex;
