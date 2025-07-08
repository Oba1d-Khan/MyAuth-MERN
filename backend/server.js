import dotenv from "dotenv";
const result = dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
// Import custom middleware functions for error handling
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import connectDB from "./config/db.js";

// Define the port to run the server, falling back to 5000 if not specified in environment variables
const port = process.env.PORT || 5000;

import userRoutes from "./routes/userRoutes.js";

// Establish a connection to the database
connectDB();

// Initialize the Express application
const app = express();

import cors from "cors";

// Allow requests from your frontend domain
app.use(
  cors({
    origin: [
      "http://localhost:3000", // for local dev
      "https://authnow.vercel.app", // for production, replace with your actual Vercel URL
    ],
    credentials: true,
  })
);

// Middleware to parse incoming JSON payloads
app.use(express.json());
// Middleware to parse incoming URL-encoded data(form data)
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Use the user routes for any requests to /api/users
app.use("/api/users", userRoutes);

// Define a simple route for the root URL
app.get("/", (req, res) => res.send(`Server is ready!`));

// Middleware for handling 404 errors (not found)
app.use(notFound);
// Middleware for handling errors
app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Server started on  PORT : ${port}`));
