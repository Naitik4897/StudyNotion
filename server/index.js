// filepath: c:\Users\nrmai\Downloads\Study-Notion Project\Study-Notion-Project\server\index.js
const express = require("express");
const app = express();
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 4000;

// Database connection
database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS configuration for production
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://localhost:3000',
      process.env.FRONTEND_URL,
      // Will be updated after deployment
    ];
    
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // For development, allow all origins
      callback(null, true);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// Cloudinary connection
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "StudyNotion server is up and running....",
  });
});

// Health check route
app.get("/health", (req, res) => {
  return res.json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString()
  });
});

// Start server only in development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;