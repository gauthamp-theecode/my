import { Fragment } from "react";
import { Navbar } from "../../components/Navbar";
import { ProductCardHorizontal } from "../../components/ProductCardHorizontal";

import { usePayment } from "../../context/payment-context";
import "./payment.css";

export const Payment = () => {
  const { payment } = usePayment();
  console.log(payment);

  // Calculate total price
  const totalPrice = payment.reduce((total, product) => total + product.price, 0);

  const paymentWithQuantityLimit = payment.map((product) => {
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

  return (
    <Fragment>
      <Navbar />
      <main className="main">
        {payment && payment.length > 0 ? (
          <h2>Your Payment: ({payment.length}) items</h2>
        ) : (
          <h2>Your Payment is Empty</h2>
        )}
        <div className="main-cart d-flex direction-column gap">
        {paymentWithQuantityLimit && paymentWithQuantityLimit.length > 0 ? (
            paymentWithQuantityLimit.map((product) => (
              <ProductCardHorizontal key={product.id} product={product} />
            ))
          ) : (
            ""
          )}
        </div>
        <br /><br /><br /><br />
            <div className="address-form">
                <h3>Address Details</h3>
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Street" />
                    <input type="text" placeholder="City" />
                    <input type="text" placeholder="State" />
                    <input type="text" placeholder="Postal Code" />
            </div>
            <div className="payment-form">
                <h3>Payment Details</h3>
                    <input type="text" placeholder="Cardholder Name" />
                    <input type="text" placeholder="Card Number" />
                    <input type="text" placeholder="Expiration Date" />
                    <input type="text" placeholder="CVV" />
            </div>

        <div className="total-price">Total Price: ${totalPrice}</div>

      </main>
    </Fragment>
  );
};
