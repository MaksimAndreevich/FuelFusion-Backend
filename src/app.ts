import express from "express";
import mondoose from "mongoose";
import { loginValidation, registerValidation } from "./validations/auth";
import checkAuth from "./utils/checkAuth";
import { getMe, login, register } from "./controllers/UserContoller";
import "dotenv/config";
import "colors";

mondoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log(`[DB] - Connect Success`.green))
  .catch((err) => console.log(`[DB] - ${err}`.red));

const app = express();
const port = 3000;

app.use(express.json());

app.post("/auth/register", registerValidation, register);
app.post("/auth/login", loginValidation, login);
app.get("/auth/me", checkAuth, getMe);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`.yellow);
});
