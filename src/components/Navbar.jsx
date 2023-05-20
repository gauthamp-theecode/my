import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/cart-context";

export const Navbar = () => {
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [payment, setPayment] = useState(1);

  const { cart, cartDispatch } = useCart();

  let logoutfun = () => {
    localStorage.clear();
    navigate("/");
  };

  const removeAllCartItems = () => {
    // Logic to remove all cart items goes here
  };

  const handleCheckButtonClick = () => {
    removeAllCartItems();
    navigate("/home");
  };

  useEffect(() => {
    setCartItemCount(cart.length);
  }, [cart]);

  const handlePaymentButtonClick = () => {
    // Logic for payment button click goes here
  };


  return (
    <header className="heading d-flex grow-shrink-basis align-center">
      <div className="heading-title-icon d-flex grow-shrink-basis align-center">
        <h1 className="heading-title">
          <Link to="/" className="link cursor">
            Gautham project
          </Link>
        </h1>
      </div>
      <nav className="navigation">
        <ul className="list-non-bullet">
          <li className="list-item-inline">
            <Link to="/home" className="link cursor">
              Home
            </Link>
          </li>
          <li className="list-item-inline">
            <Link to="/cart" className="link cursor">
              Cart {cartItemCount > 0 && `(${cartItemCount})`}
            </Link>
          </li>


          <li onClick={logoutfun} className="list-item-inline">
            log out
          </li>
        </ul>
      </nav>
      <button onClick={handleCheckButtonClick}>Check</button>
    </header>
  );
};

