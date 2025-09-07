import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import "./BuyerDashboard.css";
import logo from "../../../assets/logo.png";
import markerIconImg from "../../../assets/image.png";
import markerIconImg2 from "../../../assets/image2.png";
import Marketplace from "../../public/Marketplace/Marketplace";
import Profile from "../Profile/Profile";
import NFTReceipt from "../NFTReceipt/NFTReceipt";

// Leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconImg,
  iconUrl: markerIconImg,
  shadowUrl: markerIconImg2,
});

// Map & data
const ethiopiaCenter = [9.145, 40.489673];
const productPins = [
  { id: 1, crop: "Teff", price: 120, farmer: "Abebe", position: [9.03, 39.7] },
  { id: 2, crop: "Maize", price: 100, farmer: "Kebede", position: [8.9, 38.8] },
  { id: 3, crop: "Wheat", price: 110, farmer: "Marta", position: [9.2, 37.7] },
];

function BuyerDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("en");
  const [mainView, setMainView] = useState("dashboard");

  const [walletBalance] = useState(5000);
  const [purchases] = useState([
    { crop: "Teff", qty: 50, total: 6000, date: "2025-08-25" },
    { crop: "Maize", qty: 100, total: 12000, date: "2025-08-18" },
    { crop: "Wheat", qty: 70, total: 9000, date: "2025-08-12" },
  ]);

  const predictionData = [
    { name: "Teff", value: 121 },
    { name: "Wheat", value: 110 },
    { name: "Maize", value: 100 },
  ];

  const COLORS = ["#34a853", "#fbbc04", "#2d6cdf"];

  const monthlyData = [
    { month: "Jan", purchases: 12000 },
    { month: "Feb", purchases: 15000 },
    { month: "Mar", purchases: 11000 },
    { month: "Apr", purchases: 17000 },
    { month: "May", purchases: 14000 },
    { month: "Jun", purchases: 19000 },
    { month: "Jul", purchases: 21000 },
  ];

  const t = (key) => {
    const dict = {
      en: {
        app: "AfriEthAgriTrack",
        dashboard: "Dashboard",
        marketplace: "Marketplace",
        profile: "Profile",
        nft: "NFT Receipt",
        walletBalance: "Wallet Balance",
        recentPurchases: "Recent Purchases",
        pricePredictions: "AI Price Predictions",
        monthlyPurchases: "Monthly Purchases",
        buyNow: "Buy Now",
        logout: "Logout",
        productMap: "Product Map",
        farmer: "Farmer",
        price: "Price",
        etb: "ETB",
        qty: "Qty",
        total: "Total",
        lang: "Language",
      },
      am: {
        app: "አፍሪኤትአግሪትራክ",
        dashboard: "ዳሽቦርድ",
        marketplace: "ገበያ",
        profile: "መገለጫ",
        nft: "NFT ደረሰኝ",
        walletBalance: "የቦርሳ ክምችት",
        recentPurchases: "የቅርብ ጊዜ ግዢዎች",
        pricePredictions: "የAI የዋጋ ትንበያ",
        monthlyPurchases: "የወርሃዊ ግዢዎች",
        buyNow: "አሁኑኑ ግዛ",
        logout: "ውጣ",
        productMap: "የምርቶች ካርታ",
        farmer: "ገበሬ",
        price: "ዋጋ",
        etb: "ብር",
        qty: "መጠን",
        total: "ጠቅላላ",
        lang: "ቋንቋ",
      },
    };
    return dict[lang][key] || key;
  };

  return (
    <div className={darkMode ? "app-container dark" : "app-container"}>
      {/* Topbar */}
      <header className="topbar">
        <div className="brand">
          <img src={logo} alt="logo" className="logo" />
          <span>{t("app")}</span>
        </div>
        <div className="topbar-actions">
          <button className="chip" onClick={() => setLang(lang === "en" ? "am" : "en")}>
            {lang === "en" ? "EN" : "አማ"}
          </button>
          <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button className="chip danger" onClick={() => alert("Logged out!")}>
            {t("logout")}
          </button>
        </div>
      </header>

      {/* Layout */}
      <div className="layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li className={mainView === "dashboard" ? "active" : ""} onClick={() => setMainView("dashboard")}>
              📊 {t("dashboard")}
            </li>
            <li className={mainView === "marketplace" ? "active" : ""} onClick={() => setMainView("marketplace")}>
              🛒 {t("marketplace")}
            </li>
            <li className={mainView === "profile" ? "active" : ""} onClick={() => setMainView("profile")}>
              👤 {t("profile")}
            </li>
            <li className={mainView === "nft" ? "active" : ""} onClick={() => setMainView("nft")}>
              🧾 {t("nft")}
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="main">
          {mainView === "dashboard" && (
            <div className="dashboard-grid">
              {/* Left Column */}
              <div className="left-col">
                {/* Wallet KPI */}
                <div className="card kpi">
                  <div className="kpi-value">{walletBalance.toLocaleString()} {t("etb")}</div>
                  <div className="kpi-label">{t("walletBalance")}</div>
                </div>

                {/* Recent Purchases */}
                <div className="card">
                  <h3>{t("recentPurchases")}</h3>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Crop</th>
                        <th>{t("qty")}</th>
                        <th>{t("total")} ({t("etb")})</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchases.map((p, i) => (
                        <tr key={i}>
                          <td>{p.crop}</td>
                          <td>{p.qty}</td>
                          <td>{p.total.toLocaleString()}</td>
                          <td>{p.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* AI Price Prediction */}
                <div className="card">
                  <h3>{t("pricePredictions")} <span className="ai-badge">AI</span></h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={predictionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {predictionData.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Monthly Purchases */}
                <div className="card">
                  <h3>{t("monthlyPurchases")}</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="purchases" fill="#2d6cdf" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right Column - Map */}
              <div className="right-col">
                <div className="card">
                  <h3>{t("productMap")}</h3>
                  <MapContainer center={ethiopiaCenter} zoom={6} style={{ height: "800px", width: "100%", borderRadius: "12px" }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; OpenStreetMap contributors'
                    />
                    {productPins.map(pin => (
                      <Marker key={pin.id} position={pin.position}>
                        <Popup>{pin.crop} - {pin.price} ETB <br /> Farmer: {pin.farmer}</Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </div>
            </div>
          )}

          {mainView === "marketplace" && (
            <section className="marketplace">
              <Marketplace/>
            </section>
          )}

          {mainView === "profile" && (
            <section className="profile">
                <Profile/>
            </section>
          )}

          {mainView === "nft" && (
            <section className="nft">
              <NFTReceipt/>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default BuyerDashboard;
