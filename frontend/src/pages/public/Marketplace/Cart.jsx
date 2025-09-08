import React from "react";
import "./Marketplace.css"; // reuse same CSS

const Cart = ({ cart, increaseQuantity, decreaseQuantity}) => {
  if (cart.length === 0) {
    return null; // don't show cart if empty
  }
  

  return (
    <div className="cart-summary">
      <h3>Your Cart</h3>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <span>
              {item.name} - {item.price} S/kg
            </span>
            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </div>
            <span>Total: {item.price * item.quantity} S</span>
          </li>
        ))}
      </ul>
      <p>
        <strong>
          Grand Total:{" "}
          {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} S
        </strong>
      </p>
   {/* <a 
  href="moz-extension://ab8858b3-36b7-4929-a767-5e7242cc6216/home.html#asset/0x92/" 
  target="_blank" 
  rel="noreferrer"
> */}
  <button className="buy-now-btn">Buy Now</button>


    </div>
  );
};

export default Cart;
