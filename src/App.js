import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./pages/Register";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Coupon from "./pages/Coupon";
import CouponCreate from "./pages/couponView/CouponCreate";
import CouponEdit from "./pages/couponView/CouponEdit";
import CouponDelete from "./pages/couponView/CouponDelete";
import { AuthProvider, AuthContext } from "./context/AuthContext"; // <-- Import the AuthProvider
import ProductDetails from "./pages/ProductDetails";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from 'react-toastify';
import ProductIndex from "./pages/productView/ProductIndex";
import ProductCreate from "./pages/productView/ProductCreate";
import ProductEdit from "./pages/productView/ProductEdit";
import ProductDelete from "./pages/productView/ProductDelete";
import CartIndex from "./pages/CartIndex";


function App() {
  return (
    <Router>
      <AuthProvider>
        {/* Bootstrap Navbar */}
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Mango</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <AuthContext.Consumer>
                  {({ role }) =>
                    role === "ADMIN" && (
                      <li className="nav-item dropdown">
                        <button type="button" className="nav-link dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                          Content Management
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <li><Link className="dropdown-item" to="/coupon">Coupon</Link></li>
                          <li><Link className="dropdown-item" to="/productIndex">Product</Link></li>
                          <li><hr className="dropdown-divider" /></li>
                          <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                        </ul>
                      </li>)
                  }
                </AuthContext.Consumer>
                <li className="nac-item">
                  <Link className="nav-link" to="/CartIndex"><i class="bi bi-cart"></i></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link disabled" aria-disabled="true">Disabled</Link>
                </li>
              </ul>
              <ul className="navbar-nav">
                <AuthContext.Consumer>
                  {({ user, logout }) => (
                    user ? (
                      <>
                        <li className="nav-item">
                          <span className="nav-link">Welcome, {user.name}</span>
                        </li>
                        <li className="nav-item">
                          <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
                        </li>
                      </>
                    ) : <><li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                      </li></>
                  )}
                </AuthContext.Consumer>
              </ul>

            </div>
          </div>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/coupon"
            element={
              <PrivateRoute requiredRole="ADMIN">
                <Coupon />
              </PrivateRoute>
            }
          />
          <Route
            path="/coupon/createCoupon"
            element={
              <PrivateRoute requiredRole="ADMIN">
                <CouponCreate />
              </PrivateRoute>
            }
          />
          <Route
            path="/coupon/couponEdit/:id"
            element={
              <PrivateRoute requiredRole="ADMIN">
                <CouponEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/coupon/couponDelete/:id"
            element={
              <PrivateRoute requiredRole="ADMIN">
                <CouponDelete />
              </PrivateRoute>
            }
          />

          <Route path="/ProductIndex" element={
            <PrivateRoute requiredRole="ADMIN">
              <ProductIndex />
            </PrivateRoute>
          }
          />
          <Route path="/ProductCreate" element={
            <PrivateRoute requiredRole="ADMIN">
              <ProductCreate />
            </PrivateRoute>
          }
          />
          <Route path="/ProductEdit/:id" element={
            <PrivateRoute requiredRole="ADMIN">
              <ProductEdit />
            </PrivateRoute>
          }
          />
          <Route path="/ProductDelete/:id" element={
            <PrivateRoute requiredRole="ADMIN">
              <ProductDelete />
            </PrivateRoute>
          }
          />

          <Route path="/CartIndex" element={
            <PrivateRoute requiredRole="">
              <CartIndex />
            </PrivateRoute>
          } 
          />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </Router >
  );
}

export default App;
