import { AlertCircle, BarChart2, Cctv, Settings, Menu, Users, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const Logo = () => {
  return (
    <motion.div
      className="text-white text-center flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Logo Image */}
      <img
        src="unisys_logo.png"
        alt="UNISYS logo"
        className="w-20 h-17 object-contain"
      />

      {/* Logo Text */}
      <div className="text-xl font-bold tracking-wide mt-1">
        <span className="text-gradient bg-gradient-to-t from-[#00E68F] via-[#00B378] to-[#007F5E] bg-clip-text text-transparent">
          ZEN
        </span>{" "}
        <span className="text-gradient bg-gradient-to-b from-[#00E68F] via-[#00B378] to-[#007F5E] bg-clip-text text-transparent">
          SAFE
        </span>
      </div>


    </motion.div>
  );
};



const SIDEBAR_ITEMS = [
  {
    name: "Dashboard",
    icon: BarChart2,
    color: "#6366f1",
    href: "/",
  },
  { name: "Alerts", icon: AlertCircle, color: "#FF0000", href: "/alerts", count: 0 },
  { name: "ChatBot", icon: FaRobot, color: "#8B5CF6", href: "/chatbot"},
  { name: "Notify", icon: Bell, color: "#8B5CF6", href: "/notify" },
  { name: "Nearest CCTV", icon: Cctv, color: "#3B82F6", href: "/nearest-cctvs" },
  { name: "Case Statistics", icon: Users, color: "#EC4899", href: "/case-statistics" },
  { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    const fetchAlertCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/alerts/fetch-alert-count');
        const data = await response.json();
        setAlertCount(data.count);
      } catch (error) {
        console.error('Error fetching alert count:', error);
      }
    };

    fetchAlertCount();
  }, []);

  const audio = new Audio("/path-to-your-audio-file/alert-sound.mp3");

  useEffect(() => {
    if (alertCount > 0) {
      audio.play();
    }
  }, [alertCount, audio]);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"}`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <div className="flex items-center justify-start mb-1 mt-3 space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Menu size={28} />
          </motion.button>
          {isSidebarOpen && <Logo />}
        </div>

        <nav className="mt-4 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div
                className="flex items-center p-4 text-base font-semibold rounded-lg hover:bg-gray-700 transition-colors mb-2"
              >
                <item.icon size={24} style={{ color: item.color, minWidth: "24px" }} />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 text-white whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};


export default Sidebar;
