import express from "express";
import mondoose from "mongoose";
import { registerValidation } from "./validations/auth";
import { validationResult } from "express-validator";
import UserModal from "./models/User";
import bcrypt from "bcrypt";
import { createToken } from "./helpers";
import checkAuth from "./utils/checkAuth";

mondoose
  .connect("mongodb+srv://admin:Zmmz159@clusterfuilfusion.dumknae.mongodb.net/garage?retryWrites=true&w=majority&appName=ClusterFuilFusion")
  .then(() => console.log(`[DB] - Connetn Success`))
  .catch((err) => console.log(`[DB] - ${err}`));

const app = express();
const port = 3000;

app.use(express.json());

app.post("/auth/register", registerValidation, async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModal({
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = createToken(user._id);

    const { passwordHash, ...userData } = user["_doc"];

    res.json({ ...userData, token });
  } catch (err) {
    console.log("Ошибка при регистрации пользователя", err);
    res.status(500).json({
      message: "Не удалось зарегистрироваться.",
    });
  }
});

app.post("/auth/login", async (req: express.Request, res: express.Response) => {
  try {
    const user = await UserModal.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Ошибка авторизации.",
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user["_doc"].passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: "Не верный логин или пароль.",
      });
    }

    const token = createToken(user._id);

    const { passwordHash, ...userData } = user["_doc"];

    res.json({ ...userData, token });
  } catch (err) {
    console.log("Ошибка при авторизации пользователя", err);
    res.status(500).json({
      message: "Не удалось авторизоваться.",
    });
  }
});

app.get("/auth/me", checkAuth, (req: express.Request, res: express.Response) => {
  try {
    console.log();
  } catch (err) {
    console.log("Ошибка при получении информации о пользователе", err);
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
