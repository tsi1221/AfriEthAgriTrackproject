import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

// Public pages
import Login from "./pages/public/Login/Login";
import Signup from "./pages/public/Signup/Signup";
import Marketplace from "./pages/public/Marketplace/Marketplace";

// Private pages
import Profile from "./pages/private/Profile/Profile";
import NFTReceipt from "./pages/private/NFTReceipt/NFTReceipt";
import BuyerDashboard from "./pages/private/BuyerDashboard/BuyerDashboard";
import FarmerDashboard from "./components/FarmerDashboard/FarmerDashboard";
import ProfileDashboard from "./components/ProfileDashboard/ProfileDashboard";
import AddProduct from "./components/AddProduct/AddProduct";
import Dashboard from "./components/Dashboard/Dashboard";
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/marketplace" element={<Marketplace />} />

          {/* Private/User Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/nft" element={<NFTReceipt />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/profiledashboard" element={<ProfileDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/buyerdashboard" element={<BuyerDashboard />} />
          <Route path="/farmerdashboard" element={<FarmerDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
