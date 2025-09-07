import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./ProfileDashboard.css";
import logo from "../../assets/logo.png"; // Replace with your logo path

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const chartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      label: "Price (S/kg)",
      data: [0.298, 0.300, 0.302, 0.304, 0.305],
      borderColor: "#4caf50",
      backgroundColor: "rgba(76, 175, 80, 0.2)",
      fill: true,
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: true },
    tooltip: { enabled: true },
  },
  scales: {
    y: { beginAtZero: false },
  },
};

const ProfileDashboard = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Fresh Maize", price: 100, stock: 50, image: "" },
    { id: 2, name: "Tomatoes", price: 80, stock: 30, image: "" },
    { id: 3, name: "Potatoes", price: 60, stock: 40, image: "" },
  ]);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", price: "", stock: "", image: "" });
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", image: "" });

  const handleDelete = (id) => setProducts(products.filter((p) => p.id !== id));
  const handleEdit = (product) => {
    setEditId(product.id);
    setEditData({ ...product });
  };
  const handleSave = (id) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, ...editData, price: Number(editData.price), stock: Number(editData.stock) }
          : p
      )
    );
    setEditId(null);
  };
  const handleAdd = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return;
    const nextId = products.length ? products[products.length - 1].id + 1 : 1;
    setProducts([...products, { id: nextId, ...newProduct }]);
    setNewProduct({ name: "", price: "", stock: "", image: "" });
  };

  return (
    <div className="profile-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="AgriTrack Logo" className="logo" />
          <h2>AfriEthAgriTrack</h2>
        </div>
        <nav>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Dashboard
          </NavLink>
          <NavLink
            to="/profileDashboard"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Profile
          </NavLink>
          <NavLink
            to="/marketplace"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Marketplace
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>Profile & Products</h1>

        {/* Products Table */}
        <section className="products-section">
          <h2>My Products</h2>
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price (S/kg)</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    {editId === product.id ? (
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={editData.image}
                        onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                      />
                    ) : product.image ? (
                      <img src={product.image} alt={product.name} className="product-image" />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td>
                    {editId === product.id ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td>
                    {editId === product.id ? (
                      <input
                        type="number"
                        value={editData.price}
                        onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                      />
                    ) : (
                      product.price
                    )}
                  </td>
                  <td>
                    {editId === product.id ? (
                      <input
                        type="number"
                        value={editData.stock}
                        onChange={(e) => setEditData({ ...editData, stock: e.target.value })}
                      />
                    ) : (
                      product.stock
                    )}
                  </td>
                  <td>
                    {editId === product.id ? (
                      <>
                        <button className="save-btn" onClick={() => handleSave(product.id)}>
                          Save
                        </button>
                        <button className="cancel-btn" onClick={() => setEditId(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="edit-btn" onClick={() => handleEdit(product)}>
                          Edit
                        </button>
                        <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                  />
                </td>
                <td>
                  <button className="add-btn" onClick={handleAdd}>
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Analytics Section */}
        <section className="analytics-section">
          <h2>Analytics</h2>
          <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
          </div>

          <div className="sales-overview">
            <h3>Sales Overview</h3>
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Price (S/kg)</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src="maize-icon.png" alt="Maize" className="crop-icon" /> Fresh Maize
                  </td>
                  <td>100</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>
                    <img src="sorghum-icon.png" alt="Sorghum" className="crop-icon" /> Sorghum
                  </td>
                  <td>80</td>
                  <td>30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfileDashboard;
