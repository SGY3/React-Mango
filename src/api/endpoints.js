const AUTH_BASE = process.env.REACT_APP_AUTH_API;
const PRODUCT_BASE = process.env.REACT_APP_PRODUCT_API;
const CART_BASE = process.env.REACT_APP_CART_API;
const COUPON_BASE = process.env.REACT_APP_COUPON_API;

const endpoints = {
  auth: {
    register: `${AUTH_BASE}/Register`,
    login: `${AUTH_BASE}/Login`,
    assignRole: `${AUTH_BASE}/AssignRole`,
  },
  product: {
    getAll: `${PRODUCT_BASE}`,
    getById: (id) => `${PRODUCT_BASE}/${id}`,
    save: `${PRODUCT_BASE}`,
    delete: (id) => `${PRODUCT_BASE}/${id}`
  },
  cart: {
    getCart: (userId) => `${CART_BASE}/GetCart/${userId}`,
    addToCart: `${CART_BASE}/CartUpsert`,
    removeFromCart: `${CART_BASE}/RemoveCart`,
    applyCoupon:`${CART_BASE}/ApplyCoupon`
  },
  coupon: {
    getAll: `${COUPON_BASE}`,
    getById: (id) => `${COUPON_BASE}/${id}`,
    getbyCode: (code) => `${COUPON_BASE}/GetByCode/${code}`,
    save: `${COUPON_BASE}`,
    update: `${COUPON_BASE}`,
    delete: (id) => `${COUPON_BASE}/${id}`
  },
};

export default endpoints;
