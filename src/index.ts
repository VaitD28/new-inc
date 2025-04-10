import express from "express";
import { setupApp } from "./setup-app";

export const app = express();
setupApp(app);

export const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
