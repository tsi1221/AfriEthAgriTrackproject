import React, { useState, useContext } from "react";
import Sidebar from "../Sidebar/Sidebar";
import AddProduct from "../AddProduct/AddProduct";
import ProductCard from "../ProductCard/ProductCard";
import { ThemeContext } from "../../context/ThemeContext";
import { translations } from "../../i18n/translations";
import "./FarmerDashboard.css";

const FarmerDashboard = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [lang, setLang] = useState("en");
  const [products, setProducts] = useState([]);

  const toggleLanguage = () => setLang(lang === "en" ? "am" : "en");

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  const handleDelete = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const handleEdit = (index, updatedProduct) => {
    const newProducts = [...products];
    newProducts[index] = updatedProduct;
    setProducts(newProducts);
  };

  return (
    <div className={`dashboard ${theme}`}>
      <Sidebar
        toggleTheme={toggleTheme}
        currentTheme={theme}
        toggleLanguage={toggleLanguage}
        currentLang={lang}
      />
      <div className="dashboard-content">
        <h1>{translations[lang].dashboard}</h1>
        <AddProduct onAddProduct={handleAddProduct} />
        <div className="product-list">
          {products.map((p, idx) => (
            <ProductCard
              key={idx}
              product={p}
              onDelete={() => handleDelete(idx)}
              onEdit={(updatedProduct) => handleEdit(idx, updatedProduct)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
