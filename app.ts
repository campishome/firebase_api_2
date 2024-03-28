import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import uploadRouter from "./api/upload"; // Adjusted import statement

export const app = express();

// CORS middleware to allow cross-origin requests
app.use(cors());

// Body parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Mount the upload router at the "/upload" endpoint
app.use("/upload", uploadRouter); // Using uploadRouter instead of upload

export default app;
