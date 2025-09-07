import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

const defaultProducts = [
  { id: 1, name: "Fresh Maize", price: 100, stock: 50 },
  { id: 2, name: "Tomatoes", price: 80, stock: 30 },
  { id: 3, name: "Potatoes", price: 60, stock: 40 },
];

const defaultSales = [
  { month: "Jan", sales: 200 },
  { month: "Feb", sales: 150 },
  { month: "Mar", sales: 300 },
  { month: "Apr", sales: 250 },
  { month: "May", sales: 400 },
  { month: "Jun", sales: 350 },
];

function Dashboard() {
  const [products, setProducts] = useState(defaultProducts);
  const [editingId, setEditingId] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });

  // Add product
  const handleAdd = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return;
    const nextId = products.length ? products[products.length - 1].id + 1 : 1;
    setProducts([...products, { id: nextId, ...newProduct }]);
    setNewProduct({ name: "", price: "", stock: "" });
  };

  // Delete product
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Start edit
  const handleEdit = (id) => {
    setEditingId(id);
  };

  // Save edit
  const handleSave = (id) => {
    setEditingId(null);
  };

  // Cancel edit
  const handleCancel = () => {
    setEditingId(null);
  };

  // Update product inline
  const handleChange = (id, field, value) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, [field]: field === "name" ? value : Number(value) } : p))
    );
  };

  return (
    <div className="dashboard-container">
      <h1>Farmer Dashboard</h1>

      {/* Sales Graph */}
      <div className="chart-container">
        <h2>Monthly Sales</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={defaultSales} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Product List */}
      <div className="product-container">
        <h2>Products</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price (S/kg)</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  {editingId === p.id ? (
                    <input
                      type="text"
                      value={p.name}
                      onChange={(e) => handleChange(p.id, "name", e.target.value)}
                    />
                  ) : (
                    p.name
                  )}
                </td>
                <td>
                  {editingId === p.id ? (
                    <input
                      type="number"
                      value={p.price}
                      onChange={(e) => handleChange(p.id, "price", e.target.value)}
                    />
                  ) : (
                    p.price
                  )}
                </td>
                <td>
                  {editingId === p.id ? (
                    <input
                      type="number"
                      value={p.stock}
                      onChange={(e) => handleChange(p.id, "stock", e.target.value)}
                    />
                  ) : (
                    p.stock
                  )}
                </td>
                <td>
                  {editingId === p.id ? (
                    <>
                      <button onClick={() => handleSave(p.id)}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(p.id)}>Edit</button>
                      <button onClick={() => handleDelete(p.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            <tr>
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
                <button onClick={handleAdd}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
