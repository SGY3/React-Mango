import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./pages/Register";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider, AuthContext } from "./context/AuthContext"; // <-- Import the AuthProvider


function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Bootstrap Navbar */}
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="\">Mango</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Content Management
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/">Coupon</Link></li>
                    <li><Link className="dropdown-item" to="/">Product</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                  </ul>
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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
