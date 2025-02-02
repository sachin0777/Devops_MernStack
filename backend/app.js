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

// CORS Middleware configuration for Docker
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5000", // Your frontend URL or default to localhost if not set
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};



// Prometheus metrics collection setup
const promClient = require('prom-client'); // Import prom-client for Prometheus integration

// Collect default metrics (like memory usage, request duration, etc.)
promClient.collectDefaultMetrics({ timeout: 5000 });

// Expose /metrics endpoint for Prometheus scraping
app.get('/metrics', async (req, res) => {
    try {
        // Ensure that the response content type is set for Prometheus scraping
        res.set('Content-Type', promClient.register.contentType);
        
        // Get the metrics synchronously
        const metrics = await promClient.register.metrics(); 

        // Send the metrics as the response
        res.send(metrics); 
    } catch (err) {
        // Handle any errors
        console.error('Error fetching metrics:', err);
        res.status(500).send('Error fetching metrics');
    }
});



//Http request Monitering 
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests received',
  labelNames: ['method', 'route', 'status']
});

app.use((req, res, next) => {
  res.on('finish', () => {
      httpRequestCounter.inc({
          method: req.method,
          route: req.path,
          status: res.statusCode
      });
  });
  next();
});






// app.use(cors(corsOptions)); // Apply CORS with the above configuration
app.use(cors()); // Apply CORS with the above configuration

// Middleware
app.use(express.json());

// Serve static files
app.use("/data", express.static(path.join(__dirname, "data")));

// API Route to serve dashboardStats.json
app.get('/api/dashboardStats', (req, res) => {
  const dashboardStats = require('./data/dashboardStats.json'); // Loading the JSON file
  res.json(dashboardStats); // Sending the JSON data as response
});

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
