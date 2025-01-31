const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db.js");
const residentRoutes = require("./src/routes/residentRoutes");
const authorityRoutes = require("./src/routes/authorityRoutes");
const mailRoutes = require("./src/routes/mailRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const alertRoutes = require("./src/routes/alertRoutes.js");
const http = require("http");
const path = require("path");

dotenv.config();

// Initialize express app
const app = express();


// Database connection
connectDB();

// Middleware
app.use(express.json());
app.use(cors());



// Serve static files
app.use("/data", express.static(path.join(__dirname, "data")));

// Routes

app.use("/api/alerts", alertRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/residents", residentRoutes);
app.use("/api/authorities", authorityRoutes);
app.use("/api/mail", mailRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
