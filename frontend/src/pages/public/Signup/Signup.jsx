import React, { useState } from 'react';
import './Signup.css';
import logo from '../../../assets/logo.png'; // adjust path as needed

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    publicKey: '',
    role: 'farmer',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Signing up ${formData.name} as ${formData.role}`);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <img src={logo} alt="Logo" className="signup-logo" />
        <h2>AfriEthAgriTrack Signup</h2>
        <form onSubmit={handleSignup}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address (Optional)" value={formData.address} onChange={handleChange} />
          <input type="text" name="publicKey" placeholder="Public Key / Wallet Address" value={formData.publicKey} onChange={handleChange} required />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
