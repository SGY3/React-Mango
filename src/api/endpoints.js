const AUTH_BASE = process.env.REACT_APP_AUTH_API;
const PRODUCT_BASE = process.env.REACT_APP_PRODUCT_API;
const CART_BASE = process.env.REACT_APP_CART_API;

const endpoints = {
  auth: {
    register: `${AUTH_BASE}/Register`,
    login: `${AUTH_BASE}/Login`,
    assignRole: `${AUTH_BASE}/AssignRole`,
  },
  product: {
    getAll: `${PRODUCT_BASE}`,
    getById: (id) => `${PRODUCT_BASE}/Get/${id}`,
    add: `${PRODUCT_BASE}/Add`,
  },
  cart: {
    getCart: (userId) => `${CART_BASE}/GetCart/${userId}`,
    addToCart: `${CART_BASE}/AddToCart`,
    removeFromCart: `${CART_BASE}/RemoveFromCart`,
  },
};

export default endpoints;
