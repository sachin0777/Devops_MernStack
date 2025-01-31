import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import AlertsPage from "./pages/AlertsPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import NearestCCTVs from "./pages/NearestCCTVs";
import NotifyPage from "./pages/NotifyPage";
import ChatBotPage from "./pages/ChatBotPage";

function App() {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    // Remove the animation after 3 seconds
    const timer = setTimeout(() => setShowAnimation(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {showAnimation ? (
        <div className="flex items-center justify-center w-full h-full bg-gray-800 text-gray-200">
          <div className="text-center animate-fade-in">
            {/* Logo */}
            <img
              src="unisys_u.png" // Replace with your logo path
              alt="Program Logo"
              className="w-32 h-32 mx-auto mb-4"
            />
            {/* Glowing Text */}
            <h1 className="text-4xl font-bold mb-2 text-white animate-highlight">
              UNISYS INNOVATION PROGRAM
            </h1>
            <h2 className="text-2xl font-semibold text-green-300 animate-slide-in-delay">
              ZENSAFE
            </h2>
          </div>
        </div>
      ) : (
        <>
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<OverviewPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/case-statistics" element={<UsersPage />} />
              <Route path="/notify" element={<NotifyPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/nearest-cctvs" element={<NearestCCTVs />} />
              <Route path="/chatbot" element={<ChatBotPage />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
