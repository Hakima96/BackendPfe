require("dotenv").config();
const express = require("express");
const db = require("./db/connect");
const path = require("path");
const cors = require("cors");
const securityConfig = require("./config/security.config");
const authRouter = require("./routes/auth.route");
const servicesRouter = require("./routes/services.route");

const app = express();

// Security Middleware
securityConfig(app);

// Standard Middleware
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/services", servicesRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Connect to MongoDB and start the Server
const port = process.env.PORT || 5000;
const start = async () => {
  try {
console.log(process.env.MONGODB_URI)
    await db(process.env.MONGODB_URI);
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
