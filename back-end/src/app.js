import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ConnectDB } from "./config/database";

import router from "./routers/index";

dotenv.config();

ConnectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Kết nối thành công ${process.env.PORT}`);
});
