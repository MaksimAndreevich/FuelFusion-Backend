import express from "express";
import mondoose from "mongoose";
import { loginValidation, registerValidation } from "./validations/auth";
import checkAuth from "./utils/checkAuth";
import { getMe, login, register } from "./controllers/UserContoller";

mondoose
  .connect("mongodb+srv://admin:Zmmz159@clusterfuilfusion.dumknae.mongodb.net/garage?retryWrites=true&w=majority&appName=ClusterFuilFusion")
  .then(() => console.log(`[DB] - Connetn Success`))
  .catch((err) => console.log(`[DB] - ${err}`));

const app = express();
const port = 3000;

app.use(express.json());

app.post("/auth/register", registerValidation, register);
app.post("/auth/login", loginValidation, login);
app.get("/auth/me", checkAuth, getMe);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
