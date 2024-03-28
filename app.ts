import express from "express";
import cors from "cors";

import { router as upload} from "./api/upload";
import bodyParser from "body-parser";

export const app = express();
app.use(
    cors({
      origin: "*",
    })
  );
  
app.use(bodyParser.json());
app.use("/upload", upload);

module.exports = app;