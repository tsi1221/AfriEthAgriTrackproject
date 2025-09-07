import React from "react";
import "./NFTReceipt.css";

const NFTReceipt = ({ nft }) => {
  return (
    <div className="nft-receipt-container">
      <h2>NFT Purchase Receipt</h2>
      {nft ? (
        <div className="nft-receipt-card">
          <p><strong>Name:</strong> {nft.name}</p>
          <p><strong>Price:</strong> {nft.price}</p>
          <p><strong>Transaction ID:</strong> {nft.txId}</p>
        </div>
      ) : (
        <p>No NFT purchased yet.</p>
      )}
    </div>
  );
};

export default NFTReceipt;
