import React from "react";
import "./NFTReceipt.css";

const NFTReceipt = ({ cart = [] }) => { // default to empty array

  // Calculate grand total safely
  const totalAmount = cart.length > 0 
    ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0) 
    : 0;

  return (
    <div className="nft-receipt-container">
      <h2>NFT Purchase Receipt</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="nft-receipt-card">
          <table>
            <thead>
              <tr>
                <th>Crop</th>
                <th>Price (ETB/kg)</th>
                <th>Quantity</th>
                <th>Total (ETB)</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="grand-total">
            <strong>Grand Total: {totalAmount} ETB</strong>
          </p>

          <div className="nft-buttons">
            <button onClick={() => alert("NFT generated!")}>Download NFT</button>
            <button onClick={() => alert("NFT sent to your wallet!")}>Send to Wallet</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTReceipt;
