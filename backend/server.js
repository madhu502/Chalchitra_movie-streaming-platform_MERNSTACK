import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import path from "path";

import authRoutes from "./routes/authRoute.js";
import khaltiRoutes from "./routes/khalti.js";
import movieRoutes from "./routes/movieRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import searchRoutes from "./routes/searchRoute.js";
import tvRoutes from "./routes/tvRoute.js";

import { connectDB } from "./config/db.js";
import { ENV_VARS } from "./config/envVars.js";
import { protectRoute } from "./middleware/protectRoute.js";

const app = express();

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/khalti", khaltiRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);
app.use("/api/v1/review", protectRoute, reviewRoute);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
  connectDB();
});
