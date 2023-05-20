import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../reducer/cart-reducer";

const initialValue = {
  cart: [],
  paymentDetails: null,
};

const CartContext = createContext(initialValue);

const CartProvider = ({ children }) => {
  const [{ cart, paymentDetails }, cartDispatch] = useReducer(
    cartReducer,
    initialValue
  );

  return (
    <CartContext.Provider value={{ cart, paymentDetails, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
