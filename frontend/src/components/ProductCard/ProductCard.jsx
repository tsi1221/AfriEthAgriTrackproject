import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: {product.price} S / kg</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
};

export default ProductCard;
