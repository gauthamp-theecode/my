import { useCart } from "../context/cart-context";
import './ProductCard.css';

export const ProductCardHorizontal = ({ product }) => {
    const { id, name, image, oldPrice, newPrice, discount, quantity } = product;
    const { cartDispatch } = useCart();

    const handleDecrement = (id) => {
        if (quantity > 1) {
            cartDispatch({
                type: "DECREMENT",
                payload: id
            });
        }
    }

    const handleIncrement = (id) => {
        cartDispatch({
            type: "INCREMENT",
            payload: id
        });
    }

    const handleRemove = (id) => {
        cartDispatch({
            type: "REM",
            payload: id
        });
    }

    return (
        <div className="card-horizontal d-flex shadow">
            <div className="card-hori-image-container relative">
                <img className="card-image" src={image} alt="shoes" />
            </div>
            <div className="card-details d-flex direction-column">
                <div className="card-title">{name}</div>
                <div className="card-description">
                    <p className="card-price">Rs. {newPrice}<span className="price-strike-through padding-all-8">Rs. {oldPrice}</span>
                        <span className="discount padding-all-8">({discount}% OFF)</span>
                    </p>
                </div>
                <div className="quantity-container d-flex gap">
                    <p className="q-title">Quantity: </p>
                    <div className="count-container d-flex align-center gap">
                        <button className="count count-change" onClick={() => handleDecrement(id)} disabled={quantity === 1}>-</button>
                        <span className="count-value">{quantity}</span>
                        <button className="count count-change" onClick={() => handleIncrement(id)}>+</button>
                    </div>
                </div>
                <div className="cta-btn d-flex gap"> 
                    {/*<div className="cta-btn">
                        {quantity > 0 ? (
                             <button className="button hori-btn btn-primary btn-icon d-flex align-center justify-center gap cursor btn-margin">
                                Add To Cart
                            </button> 
                        ) : (
                            <span className="out-of-stock">Out of Stock</span>
                        )}
                        </div> */}
                    <div className="cta-btn">
                        <button onClick={() => handleRemove(id)} className="button hori-btn btn-outline-primary btn-icon d-flex align-center justify-center gap cursor btn-margin">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


