import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = ({ onAddProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !stock || !image) return;
    const newProduct = { name, price, stock, image: URL.createObjectURL(image) };
    onAddProduct(newProduct);
    setName("");
    setPrice("");
    setStock("");
    setImage(null);
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Price (S / kg)" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
