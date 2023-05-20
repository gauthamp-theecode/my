import { useState, Fragment } from 'react';
import { Navbar } from "../../components/Navbar";
import { ProductCardHorizontal } from "../../components/ProductCardHorizontal";

import { useCart } from "../../context/cart-context";
import "./Cart.css";

export const Cart = () => {
  const { cart } = useCart();

  const [checkout, setCheckout] = useState({});

  // console.log(cart);
  let checkoutDetails = {};

  // Calculate total price
  const totalPrice = cart.reduce((total, product) => total + product.newPrice * product.quantity, 0);
  // console.log('TT:', totalPrice);
  const cartWithQuantityLimit = cart.map((product) => {
    if (product.quantity > product.stock) {
      // If the quantity exceeds the stock, set it to the maximum available
      return {
        ...product,
        quantity: product.stock,
        outOfStock: true,
      };
    } else {
      return product;
    }
  });

  // Calculate the number of out-of-stock items
  const outOfStockCount = cartWithQuantityLimit.filter(
    (product) => product.outOfStock
  ).length;


  const getValues = (e) => {
    checkoutDetails[e.target.name] = e.target.value;
  }

  const handleCheckout = () => {
    if (Object.keys(checkoutDetails).length !== 9) {
      alert('All fields are mandatory');
      return;
    }
    setCheckout(checkoutDetails);
  }

  return (
    <Fragment>
      <Navbar />
      <main className="main">
        {cart && cart.length > 0 ? (
          <h2>Your Cart: ({cart.length}) items</h2>
        ) : (
          <h2>Your Cart is Empty</h2>
        )}
        <div className="main-cart d-flex direction-column gap">
          {cartWithQuantityLimit && cartWithQuantityLimit.length > 0 ? (
            cartWithQuantityLimit.map((product) => (
              <ProductCardHorizontal key={product.id} product={product} />
            ))
          ) : (
            ""
          )}
        </div>

        {totalPrice > 0 && <h3 className="total-price">Total Price: <span>${totalPrice}</span></h3>}

        <div className="address-form">
          <h3>Address Details</h3>
          <input type="text" placeholder="Name*" name='buildingName' onBlur={(e) => getValues(e)} />
          <input type="text" placeholder="Street*" name='street' onBlur={(e) => getValues(e)} />
          <input type="text" placeholder="City*" name='city' onBlur={(e) => getValues(e)} />
          <input type="text" placeholder="State*" name='state' onBlur={(e) => getValues(e)} />
          <input type="text" placeholder="Postal Code*" name='postal' onBlur={(e) => getValues(e)} />
        </div>
        <div className="payment-form">
          <h3>Payment Details</h3>
          <input type="text" placeholder="Cardholder Name*" name='cardholder' onBlur={(e) => getValues(e)} />
          <input type="text" placeholder="Card Number*" name='card' onBlur={(e) => getValues(e)} />
          <input type="text" placeholder="Expiration Date*" name='expiration' onBlur={(e) => getValues(e)} />
          <input type="text" placeholder="CVV*" name='cvv' onBlur={(e) => getValues(e)} />
        </div>

        {outOfStockCount > 0 && (
          <div className="out-of-stock-message">
            {outOfStockCount} item(s) are out of stock and have been adjusted in your cart.
          </div>
        )}


        <button onClick={handleCheckout} className="login">
          Checkout
        </button>

        {
          Object.keys(checkout).length > 0 && <div className='delivery-details'>
            <h4>The order will be delivered to the address:</h4>
            <p>{`${checkout?.cardholder}, ${checkout?.buildingName}, ${checkout?.street} , ${checkout?.city}, ${checkout?.postal}, ${checkout?.state}`}</p>
          </div>
        }
      </main>
    </Fragment>
  );
};



